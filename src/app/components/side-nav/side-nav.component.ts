import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

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
      name: 'Dashboard'
    },
    {
      icon: 'sentiment_very_satisfied',
      name: 'Customer Surveys'
    },
    {
      icon: 'domain',
      name: 'Supervisor Evaluations'
    } 
  ];
  userOptions: String[] = ['My Profile', 'Logout']; 
  openSideNav: boolean = true;


  constructor(private mainService: MainService) {
    this.setClickedRow = (i) => {
      this.selectedRow = i;
    } 
  }

  ngOnInit(): void {

    this.mainService.onSideNavToggle().subscribe(
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
