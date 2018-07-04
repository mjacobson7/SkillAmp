import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  openSideNav: boolean;
  position: string = "after";
  sideNavSubscription: Subscription;
  supervisorMenuOpen: boolean = false;
  systemManagementOpen: boolean = false;
  mobileViewSubscription: Subscription;
  mobileView: boolean;
  sideNavList: [any];
  showSubNav: Object = {};

  //permissions
  supervisorToolsNav: boolean = false;
  teamSurveysSubNav: boolean = false;
  manageUsersSubNav: boolean = false;

  constructor(private navService: NavService, private authService: AuthService) {
    this.navService.sidenavStatus.subscribe(navStatus => this.openSideNav = navStatus)

    this.mobileViewSubscription = this.navService.mobileView.subscribe(view => this.mobileView = view)

    // this.supervisorToolsNav = this.authService.hasPermission('CAN_VIEW_SUPERVISOR_TOOLS_NAV');
    // this.manageUsersSubNav = this.authService.hasPermission('CAN_VIEW_MANAGE_USERS_SUB_NAV');
    // this.teamSurveysSubNav = this.authService.hasPermission('CAN_VIEW_TEAM_SURVEYS_SUB_NAV');

    this.navService.getSideNavList().subscribe(navs => {
      this.sideNavList = navs;
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if(this.sideNavSubscription) this.sideNavSubscription.unsubscribe();
    this.mobileViewSubscription.unsubscribe();
  }

}
