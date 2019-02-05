import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  openSideNav: boolean;
  mobileView: boolean;
  userSubscription: Subscription;
  navSubscription: Subscription;
  mobileViewSubscription: Subscription;
  userInitials: string;


  constructor(private route: ActivatedRoute, private navService: NavService, private authService: AuthService, private userService: UserService) { 
    this.mobileViewSubscription = this.navService.mobileView.subscribe(view => this.mobileView = view)
  }

  ngOnInit() {
    this.user = this.authService.user;
    this.userInitials = this.user.firstName.split('')[0] + this.user.lastName.split('')[0];
    this.navSubscription = this.navService.sidenavStatus.subscribe(navStatus => this.openSideNav = navStatus)
    
  }

  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }


  onChangeNav() {
    this.navService.sidenavStatus.next(!this.openSideNav);
  }

  onLogout() {
    this.authService.logout();
  }




}
