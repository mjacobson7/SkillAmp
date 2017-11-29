import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  selectedRow: Number = 0;
  setClickedRow: Function;
  dashboardOptions: Object[] = [
    {
      icon: 'dashboard',
      name: 'Dashboard',
      roleType: ['agent', 'supervisor', 'admin']
    },
    {
      icon: 'sentiment_very_satisfied',
      name: 'Customer Satisfaction',
      roleType: ['agent']
    },
    {
      icon: 'domain',
      name: 'Supervisor Evaluations',
      roleType: ['agent']
    },
    {
      icon: 'person',
      name: 'My Team',
      roleType: ['supervisor']
    },
    {
      icon: 'people',
      name: 'Manage Users',
      roleType: ['admin']
    },
    {
      icon: 'assignment',
      name: 'Reports',
      roleType: ['admin', 'supervisor']
    },
    {
      icon: 'account_balance',
      name: 'Account',
      roleType: 'admin'
    },
    {
      icon: 'settings',
      name: 'Global Settings',
      roleType: 'admin'
    } 
  ];
  openSideNav: boolean = true;


  constructor(private navService: NavService) {
    this.setClickedRow = (i) => {
      this.selectedRow = i;
    } 
  }

  ngOnInit(): void {

    this.navService.onSideNavToggle().subscribe(
        (opening) => {
            if (opening) {
              console.log("opening the sidenav");
                this.openSideNav = true;
            } else {
              console.log("closing the sidenav");
                this.openSideNav = false;
            }
        }
    );
} 

}
