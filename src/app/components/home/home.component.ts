import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    openSideNav: boolean;
    sideNavSubscription: Subscription;

    constructor(private authService: AuthService, private navService: NavService) {

    }

    ngOnInit(): void {
        this.sideNavSubscription = this.navService.sidenavStatus.subscribe(navStatus => {
            this.openSideNav = navStatus
        });
    }

    ngOnDestroy() {
        this.sideNavSubscription.unsubscribe();
    }

}
