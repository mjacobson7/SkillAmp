import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {
  totalSurveys: number = 0;
  averageScore: number = 0.00;
  teamRank = '-';
  companyRank = '-';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getUserWidgetData().subscribe(data => {
      if(data.user[0].count) this.totalSurveys = data.user[0].count;
      if(data.user[0].score) this.averageScore = data.user[0].score;
      if(data.teamRank) this.teamRank = data.teamRank;
      if(data.companyRank) this.companyRank = data.companyRank;
    })
  }

}
