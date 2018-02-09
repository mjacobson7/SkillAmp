import { Http } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';


@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) { }

  login(credentials) {
   return this.http.post('/user-auth', credentials)
      .map(response => {
        const result = response.json();
        if(result && result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
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

  getCurrentUser() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    return user;
  }


}
