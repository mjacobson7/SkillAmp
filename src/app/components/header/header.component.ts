import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sideNavOpen: boolean = false;
 
  constructor(private mainService: MainService) {}

  toggleSideNav() { 
    this.sideNavOpen = !this.sideNavOpen;
    this.mainService.toggleSideNav(this.sideNavOpen);
  }

  ngOnInit() {
  }

}
