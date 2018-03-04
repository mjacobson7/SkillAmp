import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import {NavService} from '../../services/nav/nav.service';
import { User } from '../../models/user.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  passwordLabel = ['Password', 'Confirm password'];
  changePassword: Boolean;
  pageInfo: {title: string, icon: string} = {
    title: 'My Profile',
    icon: 'person'
  };
  userFormSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private navService: NavService,
    private fb: FormBuilder) {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  };

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if(user) {
        this.user = user;
        this.initializeForm();
      }
    })
  }

  initializeForm() {
    this.userForm = this.fb.group({
      username:  [this.user.username, [Validators.required, Validators.minLength(8)]],
      firstName: [this.user.firstName, Validators.required],
      passwords:  this.fb.array([
        ['', Validators.compose([Validators.minLength(8)])],
        ['', Validators.compose([Validators.minLength(8)])]
      ], this.passwordValidator),
      lastName:  [this.user.lastName, Validators.required],
      email:     [this.user.email, [Validators.required, Validators.email]],
      supervisor: this.fb.group({
        username: [this.user.supervisor ? this.user.supervisor.username : '']
      }),
      roles: [this.getRoles()]
    });
  }

  getRoles() {
    let assignedRoles = this.user.roles;
    let newArr = [];
    for(let role of assignedRoles) {
     newArr.push(role.roleName);
    }
    return newArr;
  }

  passwordValidator(array: FormArray): {[s: string]: boolean} {
    return array.value[0] === array.value[1] ? null : {'unmatched': true};
  }

  getControls() {
    return (<FormArray>this.userForm.get('passwords')).controls;
  }

  onSubmit() {
    console.log(this.userForm);
    this.userService.updateProfile(this.userForm.value)
      .subscribe(response => {
        this.user = response;
    });
  }

  changePasswordChecked(event) {
    if (event.target.checked) {
      this.changePassword = true;
    } else {
      this.changePassword = false;
    }
  }


}
