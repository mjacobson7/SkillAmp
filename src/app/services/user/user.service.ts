import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  updateProfile(user) {
    return this.httpClient.put('/updateUser?auth=' + localStorage.getItem('token'), user);
  }

}
