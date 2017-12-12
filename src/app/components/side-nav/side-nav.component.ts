import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  openSideNav: boolean = true;
  

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
      name: 'Customer Satisfaction',
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
      name: 'My Team',
      roleType: ['supervisor'],
      route: '/my_team'
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

    this.navService.onSideNavToggle().subscribe(
        (opening) => {
            if (opening) {
                this.openSideNav = true;
            } else {
                this.openSideNav = false;
            }
        }
    );
}

}
