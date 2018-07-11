import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {
  widgetData;
  navType: string;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {}

  getWidgetData(nav) {
    if (nav === 'ADMIN') {
      this.dashboardService.getAdminWidgets().subscribe(data => {
        this.navType = 'ADMIN';
        this.widgetData = data;
      })
    } else if (nav === 'SUPERVISOR') {
      this.dashboardService.getSupervisorWidgets().subscribe(data => {
        this.navType = 'SUPERVISOR';
        this.widgetData = data;
      })
    } else {
      this.dashboardService.getAgentWidgets().subscribe(data => {
        this.navType = 'AGENT';
        this.widgetData = data;
      })
    }
  }

}
