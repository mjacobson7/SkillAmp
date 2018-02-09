import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // @Input() user: {}; //probably can get rid of this and remove the my-profile component as well
  @Input() user;
  userForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();

    this.userForm = new FormGroup({
      'username': new FormControl(this.user.username),
      'firstName': new FormControl(),
      'lastName': new FormControl(),
      'email': new FormControl(this.user.email),
      'supervisor': new FormControl(),
      'role': new FormControl(),
    });

  }

  onSubmit() {
    console.log(this.userForm);
  }


}
