import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  openSideNav: boolean = true;
  
    constructor(private navService: NavService) {
   
    }
  
    ngOnInit(): void {
        this.navService.sidenavOpen.subscribe((opening) => {
            if(opening) {
                this.openSideNav = true;
            } else {
                this.openSideNav = false;
            }
        })

  } 

}
