import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {



  // totalAgentReviews = [{name: "Total Reviews", value: 37}];
  // averageAgentScore = [{name: "Average Agent Score", value: 3.57}] ;
  // averageTeamScore = [{name: "Average Team Score", value: 4.25}];
  // averageCompanyScore = [{name: "Average Company Score", value: 3.35}];
  // agentRankForTeam = [{name: "Agent Team Rank", value: 4}];
  // agentRankForCompany = [{name: "Agent Company Rank", value: 12}];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {}

}
