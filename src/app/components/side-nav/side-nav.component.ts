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

  constructor(private navService: NavService) {}
  ngOnInit(): void {
    this.openSideNav = true;
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 720 && this.openSideNav) {
      this.openSideNav = false;
      this.navService.sidenavOpen.next(this.openSideNav);  
    } else if(this.innerWidth >= 721 && !this.openSideNav) {
      this.openSideNav = true;
      this.navService.sidenavOpen.next(this.openSideNav);   
    }
  }

}
