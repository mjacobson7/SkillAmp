import { Component, OnInit, HostListener } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  openSideNav: boolean;
  position: string = "after";
  innerWidth: number;

  @HostListener ('window:resize', ['$event'])
  onResize(event) {
    if(event.target.innerWidth <= 720 && this.openSideNav) {
      this.openSideNav = false;
      this.navService.sidenavOpen.next(this.openSideNav);      
    } else if(event.target.innerWidth >= 721 && !this.openSideNav) {
      this.openSideNav = true;
      this.navService.sidenavOpen.next(this.openSideNav);      
    }
  }
  

  dashboardOptions: Object[] = [
    {
      icon: 'dashboard',
      name: 'Dashboard',
      roleType: ['user', 'supervisor', 'admin'],
      route: '/dashboard'
    },
    {
      icon: 'person',
      name: 'My Profile',
      roleType: ['user'],
      route: '/myprofile'
    },
    {
      icon: 'email',
      name: 'Messages',
      roleType: ['user'],
      route: '/messages'
    },
    {
      icon: 'sentiment_very_satisfied',
      name: 'Feedback',
      roleType: ['user'],
      route: '/customersatisfaction'
    },
    {
      icon: 'domain',
      name: 'Supervisor Evaluations',
      roleType: ['user'],
      route: '/supervisorevaluations'
    },
    {
      icon: 'people',
      name: 'Manage Users',
      roleType: ['admin'],
      route: '/manage_users'
    },
    {
      icon: 'assignment',
      name: 'Reports',
      roleType: ['admin', 'supervisor'],
      route: '/reports'
    },
    {
      icon: 'account_balance',
      name: 'Account',
      roleType: ['admin'],
      route: '/account'
    },
    {
      icon: 'settings',
      name: 'Global Settings',
      roleType: ['admin'],
      route: '/globalsettings'
    } 
  ];


  constructor(private navService: NavService) {}
  ngOnInit(): void {
    this.openSideNav = true;
  }

}
