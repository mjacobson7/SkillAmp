import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  dashboardOptions: String[] = ['Overview', 'Customer Satisfaction', 'Supervisor Evaluations'];
  userOptions: String[] = ['My Profile', 'Logout']; 
  openSideNav: boolean;


  constructor(private mainService: MainService) {

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
