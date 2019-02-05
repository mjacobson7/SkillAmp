import { Component, OnInit, HostListener } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  openSideNav: boolean;
  position: string = "after";
  supervisorMenuOpen: boolean = false;
  systemManagementOpen: boolean = false;
  mobileViewSubscription: Subscription;
  mobileView: boolean;
  sideNavList: [any];
  showSubNav: Object = {};

  constructor(private navService: NavService, private authService: AuthService) {
    this.navService.sidenavStatus.subscribe(navStatus => this.openSideNav = navStatus)
    this.mobileViewSubscription = this.navService.mobileView.subscribe(view => this.mobileView = view)
    this.navService.getSideNavList().subscribe(navs => {
      this.sideNavList = navs;
    })
  }

  ngOnInit(): void {
  }

}
