import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Injectable, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';


@Injectable()
export class AuthService implements OnDestroy {
  user = new BehaviorSubject<Object>({});
  currentUserSubscription: Subscription;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubscription = this.getCurrentUser().subscribe(result => { this.user.next(result); });
  }

  login(credentials) {
   return this.httpClient.post<any>('/userAuth', credentials)
      .map(result => {
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          this.user.next(result.user);
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
    return this.httpClient.get<any>('/getUser').map(result => {
      return result;
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
