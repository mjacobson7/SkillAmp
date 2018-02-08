import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { UserService } from '../../services/user-auth/user-auth.service';
import { AppError } from '../../common/app-error';
import { BadInput } from '../../common/bad-input';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(credentials: NgForm) {
    this.authService.login(credentials)
      .subscribe(result => {
        if(result) {
          this.router.navigate(['/dashboard']);
          this.invalidLogin = false;
        }
        else this.invalidLogin = true;
      })
    }



}
