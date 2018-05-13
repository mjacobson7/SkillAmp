import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {
  totalReviews:number = 0;
  averageScore:number = 0;
  teamRank:number = 0;
  companyRank:number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getUserWidgetData().subscribe(data => {
      this.totalReviews = data.userScoreAndCount.reviewCount;
      this.averageScore = data.userScoreAndCount.averageScore;
      this.teamRank = data.userTeamRank;
      this.companyRank = data.userCompanyRank;
    })
  }

}
