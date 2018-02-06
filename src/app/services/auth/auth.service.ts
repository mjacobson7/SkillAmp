import { Http } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) { }

  login(credentials) {
   return this.http.post('/user-auth', credentials)
      .map(response => {
        const result = response.json();
        if(result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      })
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }

  currentUser() {
    let token = localStorage.getItem('token');
    if(!token) return false;

    let newToken = new JwtHelper().decodeToken(token);
    return newToken.user;
  }

  isLoggedIn() {
    return tokenNotExpired();
  }



}
