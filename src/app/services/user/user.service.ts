import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  updateProfile(user) {
    return this.httpClient.put('/updateUser', user).map(response => {
      // this.authService.setCurrentUser(response);
      this.authService.user.next(response);
      return response;
    })
  }

}
