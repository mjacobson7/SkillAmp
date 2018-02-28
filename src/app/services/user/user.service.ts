import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/user.recipe';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  updateProfile(user) {
    return this.httpClient.put<User>('/updateUser', user).map(response => {
      this.authService.user = response;
      return response;
    });
  }

  getSupervisors() {
    return this.httpClient.get('/getSupervisors').map(response => {
      return response;
    });
  }

}
