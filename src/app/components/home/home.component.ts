import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  childValue: String;
  
  openSideNav: boolean = true;
  
    constructor(private navService: NavService) {
   
    }
  
    ngOnInit(): void {
      this.navService.onSideNavToggle().subscribe(
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
