import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {

    if (tokenNotExpired()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
      return false;
    }


  }

}
