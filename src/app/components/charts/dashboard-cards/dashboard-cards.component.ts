import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {
  totalReviews:number = 37;
  averageScore:number = 3.57;
  teamRank:number = 7;
  companyRank:number = 27;

  constructor() {}

  ngOnInit() {}

}
