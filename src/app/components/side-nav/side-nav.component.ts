import { Component, OnInit, HostListener } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  openSideNav: boolean;
  position: string = "after";
  innerWidth: number;
  supervisorMenuOpen: boolean = false;
  systemManagementOpen: boolean = false;

  constructor(private navService: NavService, private authService: AuthService) {
    this.navService.sidenavStatus.subscribe(navStatus => {
      this.openSideNav = navStatus;
    })
    // this.innerWidth = window.innerWidth;
    // if(this.innerWidth <= 720 && this.openSideNav) {
    //   this.openSideNav = false;
    //   this.navService.sidenavStatus.next(this.openSideNav);  
    // } else if(this.innerWidth >= 721 && !this.openSideNav) {
    //   this.openSideNav = true;
    //   this.navService.sidenavStatus.next(this.openSideNav);   
    // }
    // this.navService.getSideNavList().subscribe(navs => {
    //   console.log(navs);
    // })
  }

  ngOnInit(): void {}
  
  // @HostListener ('window:resize', ['$event'])
  // onResize(event) {
  //   if(event.target.innerWidth <= 720 && this.openSideNav) {
  //     this.openSideNav = false;
  //     this.navService.sidenavStatus.next(this.openSideNav);      
  //   } else if(event.target.innerWidth >= 721 && !this.openSideNav) {
  //     this.openSideNav = true;
  //     this.navService.sidenavStatus.next(this.openSideNav);      
  //   }
  // }
  
  onSystemManagementOpen() {
    if(this.supervisorMenuOpen) this.supervisorMenuOpen = !this.supervisorMenuOpen;
    this.systemManagementOpen = !this.systemManagementOpen;
  }

  onSupervisorToolsOpen() {
    if(this.systemManagementOpen) this.systemManagementOpen = !this.systemManagementOpen;
    this.supervisorMenuOpen = !this.supervisorMenuOpen
  }

}
