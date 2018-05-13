import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { NavService } from '../../services/nav/nav.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { NgOption } from '@ng-select/ng-select';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router } from '@angular/router';



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
  pageInfo: { title: string, icon: string } = {
    title: 'My Profile',
    icon: 'person'
  };
  userFormSubscription: Subscription;
  formReady: Boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private navService: NavService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  };

  ngOnInit() {
    this.initializeForm();
    this.supervisorsList = this.userService.getSupervisorDropdown();
    this.rolesList = this.userService.getRolesDropdown();

    this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          if (isNaN(params['id'])) {
            this.formReady = true;
          } else {
            this.userService.getUser(params['id']).subscribe(user => {
              this.loadUserData(user);
              this.formReady = true;
            })
          }
        } else {
          this.user = this.authService.user;
          this.loadUserData(this.user);
          this.formReady = true;
        }
      }
    )
  }

  loadUserData(user) {
    this.userForm.patchValue({
      id: user.id,
      companyId: user.companyId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      passwords: [null, null],
      email: user.email,
      supervisor: user.supervisor ? user.supervisor : null,
      roles: this.configureUserRoles(user.roles)
    })
  }

  initializeForm() {
    this.userForm = this.fb.group({
      id: [null],
      companyId: [null],
      username: [null, [Validators.required, Validators.minLength(8)]],
      firstName: [null, Validators.required],
      passwords: this.fb.array([
        [null, Validators.compose([Validators.minLength(8)])],
        [null, Validators.compose([Validators.minLength(8)])]
      ], this.passwordValidator),
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      supervisor: [{ value: null, disabled: false }],
      roles: [{ value: null, disabled: false }]
    });
  }

  isAdminRole() {
    console.log(this.user);
    for (let role of this.user.roles) {
      if (role.isAdminRole) return true;
    }
    return false;
  }

  configureUserRoles(roles) {
    let userRolesList = [];
    roles.forEach(role => {
      userRolesList.push(role.id);
    });
    return userRolesList;
  }

  passwordValidator(array: FormArray): { [s: string]: boolean } {
    return array.value[0] === array.value[1] ? null : { 'unmatched': true };
  }

  getControls() {
    return (<FormArray>this.userForm.get('passwords')).controls;
  }

  onSubmit() {
    if (this.userForm.value.roles.length < 1) {
      //throw error
    }
    if (this.changePassword) {
      this.changePassword = false;
      this.userForm.value.password = this.userForm.value.passwords[0];
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

  ngOnDestroy() {}
}
