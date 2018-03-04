import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
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
  loginForm: FormGroup;
  username;
  password;
  loginSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authService.logout();
    this.loginForm = this.formBuilder.group({
      'username': new FormControl(this.username, Validators.required),
      'password': new FormControl(this.password, Validators.required),
      'hostname': new FormControl(window.location.hostname)
    });
  }

  onLogin() {
    this.loginSubscription = this.authService.login(this.loginForm.value)
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
