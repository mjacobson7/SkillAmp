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

  getRolesDropdown() {
    return this.httpClient.get<any[]>('/getRolesDropdown').map(roles => {
      return roles;
    })
  }

  getSupervisorDropdown() {
    return this.httpClient.get<any[]>('/getSupervisorDropdown').map(supervisors => {
      return supervisors;
    })
  }

}
