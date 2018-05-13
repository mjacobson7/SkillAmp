import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { AppError } from '../../common/app-error';
import { Forbidden } from '../../common/forbidden';
import { ErrorService } from '../error/error.service';


@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private errorService: ErrorService) { }

  getAllUsers() {
    return this.httpClient.get<User>('/getAllUsers').catch(this.errorService.handleError);
  }

  updateProfile(user: User) {
    return this.httpClient.put<User>('/updateUser', user)
      .map(user => {
        this.authService.user = user;
        return user;
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

  // private handleError(error: Response) {
  //   if(error.status === 403) {
  //     return Observable.throw(new Forbidden(error));
  //   }

  //   return Observable.throw(new AppError(error));
  // }

}
