import { Http } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  authToken;
  user;

  constructor(private http: Http, private router: Router) { }

  login(credentials) {
   return this.http.post('/user-auth', credentials)
      .map(response => {
        const result = response.json();
        if(result && result.token) {
          this.storeUserData(result.token, result.user);
          return true;
        }
        return false;
      })
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authToken = null;
    this.user = null;
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }



}
