import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Company } from '../../models/company.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  private user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
    if(this.router.url !== '/login' && this.isLoggedIn()) {
      this.getCurrentUser().subscribe(user => this.setUser(user));
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  setUser(user:User):void {
    this.user.next(user);
  }

  login(credentials) {
   return this.httpClient.post<any>('/userAuth', credentials)
      .map(result => {
        if (result && result.token) {
          this.user.next(result.user);
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      });
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    if (!tokenNotExpired()) {
      this.router.navigate(['/login']);
    }
    return tokenNotExpired();
  }

  getCurrentUser() {
    return this.httpClient.get<User>('/getCurrentUser');
  }

}
