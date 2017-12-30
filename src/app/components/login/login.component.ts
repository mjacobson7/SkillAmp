import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-auth/user-auth.service';
import { AppError } from '../../common/app-error';
import { BadInput } from '../../common/bad-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private service: UserService) { }

  ngOnInit() {
  }

  login(loginInfo) {
    this.service.create(loginInfo)
      .subscribe(tokens => {
        console.log(tokens);
      },
      (error: AppError) => {
        if(error instanceof BadInput) {
          console.log(error);
        } else {
          throw error;
        }
      })
    }



}
