import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user;
  userSubscription: Subscription;

  constructor(private navService: NavService, private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



}
