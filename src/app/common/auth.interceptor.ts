import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const copiedReq = req.clone({headers: req.headers.append('auth', localStorage.getItem('token'))});
      return next.handle(copiedReq);
    } else {
      return next.handle(req);
    }

  }
}
