import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // @Input() user: {}; //probably can get rid of this and remove the my-profile component as well
  @Input() user;
  userForm: FormGroup;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();

    this.userForm = new FormGroup({
      'username': new FormControl(this.user.username),
      'firstName': new FormControl(this.user.firstName),
      'lastName': new FormControl(this.user.lastName),
      'email': new FormControl(this.user.email),
      'supervisor': new FormControl(this.user.supervisor),
      'role': new FormControl(this.user.role),
    });

  }

  onSubmit() {
    this.userService.updateProfile(this.userForm.value)
      .subscribe(response => {
        console.log(response);
    })
  }


}
