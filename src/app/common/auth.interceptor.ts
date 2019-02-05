
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { ToasterNotificationService } from './../services/toaster-notification/toaster-notification.service';
import { catchError } from 'rxjs/operators';

import { Injectable, ErrorHandler } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // tslint:disable-next-line:max-line-length
  constructor(private errorHandler: ErrorHandler, private toasterNotificationService: ToasterNotificationService, private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const copiedReq = req.clone({ headers: req.headers.append('auth', localStorage.getItem('token')) });
      return next.handle(copiedReq)
        .pipe(catchError((response: any) => {
          if (response instanceof HttpErrorResponse) {
            if (response.status === 400) {
              this.toasterNotificationService.showWarning(response.error, response.statusText);
            } else if (response.status === 403) {
              this.router.navigate(['/login']);
            } else if (response.status === 500) {
              this.authService.logError(response, this.authService.user).subscribe(retVal => {
                this.toasterNotificationService.showError('An error has occurred. Error reference ID: ' + retVal.id, 'Unexpected Error!');
              });
            }
          }
          return observableThrowError(response);
        }));

    } else { return next.handle(req); }
  }

}
