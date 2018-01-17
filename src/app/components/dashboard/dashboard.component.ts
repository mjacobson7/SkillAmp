import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

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

  constructor(private navService: NavService) {}

ngOnInit() {
  this.navService.pageHeaderTitle.next(this.pageInfo);
}

}
