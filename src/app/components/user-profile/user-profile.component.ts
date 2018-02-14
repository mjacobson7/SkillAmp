import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import {NavService} from '../../services/nav/nav.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user;
  userForm: FormGroup;
  passwordLabel = ['Password', 'Confirm password'];
  userFormSubscription: Subscription;
  changePassword: Boolean;
  pageInfo: {title: string, icon: string} = {
    title: 'My Profile',
    icon: 'person'
  };

  constructor(private authService: AuthService, private userService: UserService, private navService: NavService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.navService.pageHeaderTitle.next(this.pageInfo);

    this.userFormSubscription = this.authService.user.subscribe(response => {
      this.user = response;

      this.userForm = this.formBuilder.group({
        'username': new FormControl(this.user.username, [Validators.required, Validators.minLength(8)]),
        'firstName': new FormControl(this.user.firstName, Validators.required),
        passwords: this.formBuilder.array([
          ['', Validators.compose([Validators.required, Validators.minLength(8)])],
          ['', Validators.compose([Validators.required, Validators.minLength(8)])]
        ], this.passwordValidator),
        'lastName': new FormControl(this.user.lastName, Validators.required),
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'supervisor': new FormControl(this.user.supervisor, Validators.required),
        'role': new FormControl(this.user.role, Validators.required),
      });
    });
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

  ngOnDestroy() {
    this.userFormSubscription.unsubscribe();
  }


}
