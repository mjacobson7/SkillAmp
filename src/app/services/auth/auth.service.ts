import { HttpClient } from '@angular/common/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
  user = new BehaviorSubject<Object>({});

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(credentials) {
   return this.httpClient.post<any>('/userAuth', credentials)
      .map(result => {
        if(result && result.token) {
          this.setToken(result.token);
          this.user.next(result.user);
          return true;
        }
        return false;
      })
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  // setCurrentUser(user) {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  getCurrentUser() {
    return this.user;
  }


}
