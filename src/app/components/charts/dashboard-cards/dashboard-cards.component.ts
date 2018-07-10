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
  
  // widgetData = {
  //   totalSurveys: 0,
  //   averageScore: 0.00,
  //   teamRank: '-',
  //   companyRank: '-'
  // };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {

    // this.dashboardService.getUserWidgetData().subscribe(data => {
    //   if (data.user[0]) {
    //     if (data.user[0].count) this.totalSurveys = data.user[0].count;
    //     if (data.user[0].score) this.averageScore = data.user[0].score;
    //   }

    //   if (data.teamRank) this.teamRank = data.teamRank;
    //   if (data.companyRank) this.companyRank = data.companyRank;
    // })
  }


  getWidgetData(nav) {
    if (nav === 'ADMIN') {
      this.dashboardService.getAdminWidgets().subscribe(data => {
        console.log(data);
        this.navType = 'ADMIN';
        this.widgetData = data;
      })
    } else if (nav === 'SUPERVISOR') {
      this.dashboardService.getSupervisorWidgets().subscribe(data => {
        console.log(data);
        this.navType = 'SUPERVISOR';
        this.widgetData = data;
      })
    } else {
      this.dashboardService.getAgentWidgets().subscribe(data => {
        console.log(data);
        this.navType = 'AGENT';
        this.widgetData = data;
      })
    }
  }

}
