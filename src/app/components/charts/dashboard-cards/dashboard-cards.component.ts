import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent implements OnInit {

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {}

}
