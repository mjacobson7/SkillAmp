import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-auth/user-auth.service';
import { AppError } from '../../common/app-error';
import { BadInput } from '../../common/bad-input';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
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
