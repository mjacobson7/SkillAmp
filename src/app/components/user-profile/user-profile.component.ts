import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import {NavService} from '../../services/nav/nav.service';
import { User } from '../../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import { NgOption } from '@ng-select/ng-select';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  userForm: FormGroup;
  passwordLabel = ['Password', 'Confirm password'];
  changePassword: Boolean;
  supervisorsList: Observable<NgOption[]>;
  rolesList: Observable<NgOption[]>;
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
    this.userFormSubscription = this.authService.getUser().subscribe(user => {
      if(user) {
        console.log(user);
        this.user = user;
        this.supervisorsList = this.userService.getSupervisorDropdown();
        this.rolesList = this.userService.getRolesDropdown();
        this.initializeForm();
      }
    });
  }

  initializeForm() {
    this.userForm = this.fb.group({
      id:        [this.user.id],
      companyId: [this.user.companyId],
      username:  [this.user.username, [Validators.required, Validators.minLength(8)]],
      firstName: [this.user.firstName, Validators.required],
      passwords:  this.fb.array([
                    ['', Validators.compose([Validators.minLength(8)])],
                    ['', Validators.compose([Validators.minLength(8)])]
                 ], this.passwordValidator),
      lastName:  [this.user.lastName, Validators.required],
      email:     [this.user.email, [Validators.required, Validators.email]],
      supervisor: [{value: this.user.supervisorId ? this.user.supervisorId : null , disabled: !this.isAdminRole()}],
      roles: [{value: this.configureUserRoles(), disabled: !this.isAdminRole() }]
    });
  }

  isAdminRole() {
    console.log(this.user.roles);
    for (let role of this.user.roles) {
      if(role.isAdmin) return true;
    }
    return false;
  }

  configureUserRoles() {
    let userRolesList = [];
    this.user.roles.forEach(role => {
      userRolesList.push(role.id);
    });
    return userRolesList;
  }

  passwordValidator(array: FormArray): {[s: string]: boolean} {
    return array.value[0] === array.value[1] ? null : {'unmatched': true};
  }

  getControls() {
    return (<FormArray>this.userForm.get('passwords')).controls;
  }

  onSubmit() {
    if(this.userForm.value.roles.length < 1) {
      //throw error
    }
    if(this.changePassword) {
      this.userForm.value.password = this.userForm.value.passwords[0];
      delete this.userForm.value.passwords;
    } else {
      this.userForm.value.password = null;
      delete this.userForm.value.passwords;
    } 
    this.userService.updateProfile(this.userForm.value)
      .subscribe(response => {
        console.log(response);
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
