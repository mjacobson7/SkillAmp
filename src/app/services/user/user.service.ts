import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  updateProfile(user: User) {
    return this.httpClient.put<User>('/updateUser', user).map(response => {
      // this.authService.user.next(response);
      this.authService.user.next(response);
      return response;
    });
  }

  getSupervisors() {
    return this.httpClient.get('/getSupervisors').map(response => {
      return response;
    });
  }

  getUserRoles() {
    return this.httpClient.get('/getUserRoles').map(response => {
      return response;
    })
  }

}
