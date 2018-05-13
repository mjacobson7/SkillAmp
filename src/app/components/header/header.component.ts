import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  openSideNav: boolean;
  userSubscription: Subscription;
  navSubscription: Subscription;


  constructor(private route: ActivatedRoute, private navService: NavService, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {    
    this.user = this.authService.user;
    this.navSubscription = this.navService.sidenavStatus.subscribe(navStatus => {
      this.openSideNav = navStatus;
    })
  }


  ngOnDestroy() {
    this.navSubscription.unsubscribe();
  }


  onChangeNav() {
    this.navService.sidenavStatus.next(!this.openSideNav);
  }




}
