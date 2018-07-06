import { AuthService } from './../services/auth/auth.service';
import { ToasterNotificationService } from './../services/toaster-notification/toaster-notification.service';
import { AppError } from './app-error';
import { Forbidden } from './forbidden';
import { NotFoundError } from './not-found-error';
import { BadInput } from './bad-input';

import { Injectable, ErrorHandler } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private errorHandler: ErrorHandler, private toasterNotificationService: ToasterNotificationService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const copiedReq = req.clone({ headers: req.headers.append('auth', localStorage.getItem('token')) });
      return next.handle(copiedReq)
        .catch((response: any) => {
          if (response instanceof HttpErrorResponse) {
            if (response.status === 400) {
              this.toasterNotificationService.showError(response.error, response.statusText);
            }
            else if (response.status === 500) {
              this.authService.logError(response, this.authService.user).subscribe(response => {
                this.toasterNotificationService.showError("An error has occurred. Error reference ID: " + response.id, 'Unexpected Error!')
              })
            }
          }
          return Observable.throw(response);
        });

    } else return next.handle(req)
  }

}
