import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Dashboard',
    icon: 'dashboard'
  }

  constructor(private authService: AuthService, private navService: NavService) {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

ngOnInit() {}

}
