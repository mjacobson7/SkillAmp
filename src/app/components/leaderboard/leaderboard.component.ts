import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: any[];
  pageIndex: number = 0;
  length: number;

  constructor(private dashboardService: DashboardService) { }
  
    ngOnInit() {
      this.getLeaderboard();
    }

    onPageEvent(event) {
      this.pageIndex = event.pageIndex;
      this.getLeaderboard();
    }

    getLeaderboard() {
      let params = {
        pageIndex: this.pageIndex
      }
      this.dashboardService.getLeaderboard(params).subscribe(response => {
        this.length = response.length;
        this.leaderboard = response.rankings;
      })
    }
 

}

