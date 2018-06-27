import { AppError } from './app-error';
import { Forbidden } from './forbidden';
import { NotFoundError } from './not-found-error';
import { BadInput } from './bad-input';

import { Injectable, ErrorHandler } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private errorHandler: ErrorHandler) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const copiedReq = req.clone({ headers: req.headers.append('auth', localStorage.getItem('token')) });
      return next.handle(copiedReq).catch((error: HttpErrorResponse) => {
        
        if (error.status == 400) {
          // handle 400 errors
          console.log("400");
          return Observable.throw(error);
        }
    
        if (error.status == 404) {
          // handle 404 errors
          console.log("404");
          return Observable.throw(error);
        }
    
        if (error.status == 403) {
          // handl 403 errors
          console.log("403");
          return Observable.throw(error);
        }



      });
    } else {
      return next.handle(req).catch((error: HttpErrorResponse) => {

        if (error.status == 400) {
          // handle 400 errors
          console.log("400");
          return Observable.throw(error);
        }
    
        if (error.status == 404) {
          // handle 404 errors
          console.log("404");
          return Observable.throw(error);
        }
    
        if (error.status == 403) {
          // handl 403 errors
          console.log("403");
          return Observable.throw(error);
        }


      });
    }

  }


}
