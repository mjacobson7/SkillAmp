
import {throwError as observableThrowError,  Observable ,  Subscription } from 'rxjs';
import { NavService } from './../../services/nav/nav.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  invalidLogin = false;
  loginForm: FormGroup;
  username;
  password;
  mobileView: boolean;
  innerWidth: number;
  loginSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 990) {
      this.mobileView = true;
    } else if (this.innerWidth >= 991) {
      this.mobileView = false;
    }
  }

  ngOnInit() {
    this.authService.logout();
    this.loginForm = this.formBuilder.group({
      'username': new FormControl(this.username, Validators.required),
      'password': new FormControl(this.password, Validators.required)
    });
  }

  onLogin() {
    this.loginSubscription = this.authService.login(this.loginForm.value)
      .subscribe(result => {
        if (result) {
          this.invalidLogin = false;
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        this.invalidLogin = true
        return observableThrowError(error);
      } )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 990) {
      this.mobileView = true;
    } else if (event.target.innerWidth >= 991) {
      this.mobileView = false;
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }



}
