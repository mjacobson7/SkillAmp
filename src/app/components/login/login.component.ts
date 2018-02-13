import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppError } from '../../common/app-error';
import { BadInput } from '../../common/bad-input';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  invalidLogin = false;
  loginSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(credentials: NgForm) {
    this.loginSubscription = this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/dashboard']);
          this.invalidLogin = false;
        } else { this.invalidLogin = true; }
      });
    }

    ngOnDestroy() {
      this.loginSubscription.unsubscribe();
    }



}
