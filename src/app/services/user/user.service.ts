import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllUsers() {
    return this.httpClient.get<User>('/getAllUsers');
  }

  updateProfile(user: User) {
    return this.httpClient.put<User>('/updateUser', user)
    .map(response => {
      this.authService.setUser(response);
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

  getUser(userId) {
    return this.httpClient.get<User>('/getUser/' + userId);
  }

}
