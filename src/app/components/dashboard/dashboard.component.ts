import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardView: string;

  constructor() { }

  ngOnInit() { }

  onDashboardViewChange(view) {
    this.dashboardView = view;
  }


}
