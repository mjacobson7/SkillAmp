import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth/auth.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    openSideNav: boolean;
    loader: Boolean = false;
    innerWidth: number;    
    sideNavSubscription: Subscription;

    constructor(private authService: AuthService, private navService: NavService) { 
        this.innerWidth = window.innerWidth;
        if(this.innerWidth <= 990) {
          this.openSideNav = false;
          this.navService.sidenavStatus.next(this.openSideNav);
          this.navService.mobileView.next(true);  
        } else if(this.innerWidth >= 991) {
          this.openSideNav = true;
          this.navService.sidenavStatus.next(this.openSideNav);
          this.navService.mobileView.next(false);   
        }
    }

    ngOnInit(): void {
        this.sideNavSubscription = this.navService.sidenavStatus.subscribe(navStatus => {
            this.openSideNav = navStatus
        });
    }

    @HostListener ('window:resize', ['$event'])
    onResize(event) {
      if(event.target.innerWidth <= 990 && this.openSideNav) {
        this.openSideNav = false;
        this.navService.sidenavStatus.next(this.openSideNav);
        this.navService.mobileView.next(true);   
      } else if(event.target.innerWidth >= 991 && !this.openSideNav) {
        this.openSideNav = true;
        this.navService.sidenavStatus.next(this.openSideNav);  
        this.navService.mobileView.next(false);    
      }
    }

    ngOnDestroy() {
        this.sideNavSubscription.unsubscribe();
    }

}
