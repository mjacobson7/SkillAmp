import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  user: User;
  permissionsMap: Object = null;
  constructor(private httpClient: HttpClient, private router: Router) { }

  hasPermission(permissionName: string): boolean {
    return !!this.permissionsMap[permissionName];
  }

  setPermissions(permissions) {
    this.permissionsMap[permissions] = true;
  }

  logError(error, user) {
    return this.httpClient.post<any>('/logError', { error, user });
  }

  login(credentials) {
    return this.httpClient.post<any>('/userAuth', credentials)
      .pipe(map(result => {
        if (result && result.token) {
          this.user = result.user;
          this.permissionsMap = result.permissions;
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      }));
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

}
