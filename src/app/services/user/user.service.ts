import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Forbidden } from '../../common/forbidden';


@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getUsersPage(params) {
    return this.httpClient.post<any>('/getUsersPage', params);
  }

  getTeamPage(params) {
    return this.httpClient.post<any>('/getTeamPage', params);
  }

  createUser(user: User) {
    return this.httpClient.post<User>('/createUser', user);
  }

  updateProfile(user: User) {
    return this.httpClient.put<User>('/updateUser', user)
      .map(user => {
        if (user) {
          this.authService.user = user;
        }
      });
  }

  getRolesDropdown() {
    return this.httpClient.get<any[]>('/getRolesDropdown').map(roles => {
      return roles;
    });
  }

  getSupervisorDropdown() {
    return this.httpClient.get<any[]>('/getSupervisorDropdown').map(supervisors => {
      return supervisors;
    });
  }

  getAllAgentsDropdown() {
    return this.httpClient.get<any[]>('/getAllAgentsDropdown');
  }

  getTeamDropdown() {
    return this.httpClient.get<any[]>('/getTeamDropdown');
  }

  getUser(userId) {
    return this.httpClient.get<User>('/getUser/' + userId);
  }

  getDefaultUserRole() {
    return this.httpClient.get<any>('/defaultUserRole');
  }

  deleteUser(userId) {
    return this.httpClient.delete<void>('/deleteUser/' + userId);
  }

}
