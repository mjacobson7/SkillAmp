import { AuthService } from './../../services/auth/auth.service';
import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  canSupervise: boolean = false;
  canAdmin: boolean = false;
  navSelected: string;
  @Output() navCallback = new EventEmitter()


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.checkPermissions();
    this.onNavChange(this.navSelected);
  }

  onNavChange(navItem) {
    this.navSelected = navItem;
    this.navCallback.emit(navItem);
  }


  checkPermissions() {
    if (this.authService.hasPermission('CAN_ADMIN')) {
      this.canAdmin = true;
      this.navSelected = 'ADMIN';
    }
    if (this.authService.hasPermission('CAN_SUPERVISE')) {
      this.canSupervise = true;
      if (!this.authService.hasPermission('CAN_ADMIN')) {
        this.navSelected = 'SUPERVISOR';
      }
    } else {
      this.navSelected = 'AGENT';
    }
  }

}
