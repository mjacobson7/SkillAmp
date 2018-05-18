import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: any[];

  constructor(private dashboardService: DashboardService) { }
  
    ngOnInit() {
      this.dashboardService.getLeaderboard().subscribe(response => {
        this.leaderboard = response;
      })
    }
}

