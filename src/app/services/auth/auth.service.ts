import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Company } from '../../models/company.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { NavService } from '../nav/nav.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: User;
  permissionsMap: Object = null;
  constructor(private httpClient: HttpClient, private router: Router) {}

  hasPermission(permissionName: string): boolean {
    return !!this.permissionsMap[permissionName];
  }

  setPermissions(permissions) {
    this.permissionsMap[permissions] = true;
  }

  login(credentials) {
    return this.httpClient.post<any>('/userAuth', credentials)
      .map(result => {
        if (result && result.token) {
          this.user = result.user;
          this.permissionsMap = result.permissions;
          localStorage.setItem('token', result.token);
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

}
