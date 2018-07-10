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
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  userForm: FormGroup;
  createUser: Boolean = false;
  myProfile: Boolean = false;
  updateUser: Boolean = false;
  passwordLabel = ['Password', 'Confirm password'];
  changePassword: Boolean;
  supervisorsList: Observable<NgOption[]>;
  rolesList: Observable<NgOption[]>;
  userFormSubscription: Subscription;
  formReady: Boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private navService: NavService,
    private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { };

  ngOnInit() {
    this.initializeForm();
    this.supervisorsList = this.userService.getSupervisorDropdown();
    this.rolesList = this.userService.getRolesDropdown();

    this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          if (isNaN(params['id'])) {
            this.createUser = true;
            this.passwordRequired();
            this.formReady = true;
          } else {
            this.userService.getUser(params['id']).subscribe(user => {
              this.updateUser = true;
              this.loadUserData(user);
              this.formReady = true;
            })
          }
        } else {
          this.myProfile = true;
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
      active: user.active,
      password: null,
      confirmPassword: null,
      email: user.email,
      supervisorId: user.supervisor ? user.supervisorId : null,
      roles: this.configureUserRoles(user.roles)
    })
  }

  initializeForm() {
    this.userForm = this.fb.group({
      id: [null],
      companyId: [null],
      username: [null, [Validators.required, Validators.minLength(8)]],
      firstName: [null, Validators.required],
      active: [null],
      passwords: this.fb.group({
        password: [null],
        confirmPassword: [null]
      }, { validator: this.passwordValidator }),
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      supervisorId: [{ value: null, disabled: false }],
      roles: [{ value: null, disabled: false }, [Validators.required]]
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
    return array.value.password === array.value.confirmPassword ? null : { 'unmatched': true };
  }

  passwordRequired() {
    this.userForm.get(['passwords', 'password']).setValidators([Validators.required, Validators.minLength(8)]);
    this.userForm.get(['passwords', 'password']).updateValueAndValidity();
    this.userForm.get(['passwords', 'confirmPassword']).setValidators([Validators.required, Validators.minLength(8)]);
    this.userForm.get(['passwords', 'confirmPassword']).updateValueAndValidity();
  }

  passwordNotRequired() {
    this.userForm.get(['passwords', 'password']).clearValidators();
    this.userForm.get(['passwords', 'password']).updateValueAndValidity();
    this.userForm.get(['passwords', 'confirmPassword']).clearValidators();
    this.userForm.get(['passwords', 'confirmPassword']).updateValueAndValidity();
  }

  getControls() {
    return (<FormArray>this.userForm.get('passwords')).controls;
  }

  onSubmit() {
    // make password required (fix this)
    if (this.changePassword || this.createUser) {
      this.changePassword = false;
      this.userForm.value.password = this.userForm.value.passwords.password;
      delete this.userForm.value.passwords;
      if (this.userForm.value.id === null) {
        delete this.userForm.value.id;
      }
    } else {
      delete this.userForm.value.passwords;
    }

    if (this.createUser) {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['/supervisor_tools/manage_users']);
      });
    } else if (this.updateUser) {
      this.userService.updateProfile(this.userForm.value).subscribe(response => {
        this.router.navigate(['/supervisor_tools/manage_users']);
      });
    } else if (this.myProfile) {
      this.userService.updateProfile(this.userForm.value).subscribe(response => {
        this.router.navigate(['/dashboard']);
      });
    }

  }

  changePasswordChecked(event) {
    if (event.target.checked) {
      this.passwordRequired();
      this.changePassword = true;
    } else {
      this.passwordNotRequired();
      this.changePassword = false;
      this.userForm.value.password = null;
      this.userForm.value.confirmPassword = null;
    }
  }

  ngOnDestroy() { }
}
