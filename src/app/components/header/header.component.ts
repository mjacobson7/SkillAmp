import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription;


  constructor(private navService: NavService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe(user => {
      if(user) {
        this.user = user;
      }
    })
  }


  ngOnDestroy() {
      this.userSubscription.unsubscribe();
    }



}
