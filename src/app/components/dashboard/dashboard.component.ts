import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  openSideNav: boolean = true;

  constructor(private mainService: MainService) {
 
  }

  ngOnInit(): void {
    this.mainService.onSideNavToggle().subscribe(
        (opening) => {
            if (opening) {
              console.log("dashboard open");
                this.openSideNav = true;
            } else {
              console.log("dashboard close");
                this.openSideNav = false;
            }
        }
    );
} 

}
