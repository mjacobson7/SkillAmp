import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { AuthService } from '../../auth/auth.service';


@Injectable()
export class UserResolverService implements Resolve<User> {

  constructor(private router: Router, private authService: AuthService, private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
      if(this.authService.user) {
        return Observable.of(this.authService.user);
      } else {
        return this.httpClient.get<User>('/getCurrentUser').map(user => {
          if(!user) {
            this.authService.logout();
          }
          this.authService.user = user;
          return user;
        })
      }
 
  }
}
