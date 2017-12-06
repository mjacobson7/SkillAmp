import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  passwordChange: boolean = false;
  role: string[];  

  constructor() { }

  ngOnInit() {
    this.role = ['User', 'Supervisor', 'Admin'];
  }

  onChangePassword() {
    this.passwordChange = !this.passwordChange;
  }


}
