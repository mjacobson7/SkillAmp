import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  userFormSubscription: Subscription;
  pageInfo: {title: string, icon: string} = {
    title: 'My Profile',
    icon: 'person'
  };

  constructor(private authService: AuthService, private userService: UserService, private navService: NavService) { }

  ngOnInit() {
    this.navService.pageHeaderTitle.next(this.pageInfo);

    this.userFormSubscription = this.authService.user.subscribe(response => {
      this.user = response;

      this.userForm = new FormGroup({
        'username': new FormControl(this.user.username),
        'firstName': new FormControl(this.user.firstName),
        'lastName': new FormControl(this.user.lastName),
        'email': new FormControl(this.user.email),
        'supervisor': new FormControl(this.user.supervisor),
        'role': new FormControl(this.user.role),
      });


    });



  }

  onSubmit() {
    this.userService.updateProfile(this.userForm.value)
      .subscribe(response => {
        this.user = response;
    });
  }

  ngOnDestroy() {
    this.userFormSubscription.unsubscribe();
  }


}
