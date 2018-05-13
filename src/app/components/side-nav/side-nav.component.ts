import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  openSideNav: boolean;
  position: string = "after";
  innerWidth: number;
  supervisorMenuOpen: boolean = false;
  systemManagementOpen: boolean = false;

  //permissions
  supervisorToolsNav: boolean = false;
  teamSurveysSubNav: boolean = false;
  manageUsersSubNav: boolean = false;

  constructor(private navService: NavService, private authService: AuthService) {
    this.navService.sidenavStatus.subscribe(navStatus => {
      this.openSideNav = navStatus;
    })

    this.supervisorToolsNav = this.authService.hasPermission('CAN_VIEW_SUPERVISOR_TOOLS_NAV');
    this.manageUsersSubNav = this.authService.hasPermission('CAN_VIEW_MANAGE_USERS_SUB_NAV');
    this.teamSurveysSubNav = this.authService.hasPermission('CAN_VIEW_TEAM_SURVEYS_SUB_NAV');
    
    // this.innerWidth = window.innerWidth;
    // if(this.innerWidth <= 720 && this.openSideNav) {
    //   this.openSideNav = false;
    //   this.navService.sidenavStatus.next(this.openSideNav);  
    // } else if(this.innerWidth >= 721 && !this.openSideNav) {
    //   this.openSideNav = true;
    //   this.navService.sidenavStatus.next(this.openSideNav);   
    // }
    // this.navService.getSideNavList().subscribe(navs => {
    //   console.log(navs);
    // })
  }

  ngOnInit(): void {}
  
  // @HostListener ('window:resize', ['$event'])
  // onResize(event) {
  //   if(event.target.innerWidth <= 720 && this.openSideNav) {
  //     this.openSideNav = false;
  //     this.navService.sidenavStatus.next(this.openSideNav);      
  //   } else if(event.target.innerWidth >= 721 && !this.openSideNav) {
  //     this.openSideNav = true;
  //     this.navService.sidenavStatus.next(this.openSideNav);      
  //   }
  // }
  
  onSystemManagementOpen() {
    if(this.supervisorMenuOpen) this.supervisorMenuOpen = !this.supervisorMenuOpen;
    this.systemManagementOpen = !this.systemManagementOpen;
  }

  onSupervisorToolsOpen() {
    if(this.systemManagementOpen) this.systemManagementOpen = !this.systemManagementOpen;
    this.supervisorMenuOpen = !this.supervisorMenuOpen
  }

  ngOnDestroy(): void {}

}
