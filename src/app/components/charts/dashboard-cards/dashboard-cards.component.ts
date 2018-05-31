import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {
  totalSurveys;
  averageScore;
  teamRank;
  companyRank;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getUserWidgetData().subscribe(data => {
      this.totalSurveys = data.user[0].count;
      this.averageScore = data.user[0].score;
      this.teamRank = data.teamRank;
      this.companyRank = data.companyRank;
    })
  }

}
