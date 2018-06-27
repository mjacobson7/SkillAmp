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

  page = {
    pageSize: 10,
    length: null,
    pageNumber: 1,
    orderBy: 'rank',
    orderDir: 'ASC',
    searchText: ''
  };

  columns = [
    {label: 'Rank', field: 'rank', sortable: false},
    {label: 'Username', field: 'username', sortable: false},
    {label: 'First Name', field: 'first_name', sortable: false},
    {label: 'Last Name', field: 'last_name', sortable: false}
  ]

  constructor(private dashboardService: DashboardService) { }
  
    ngOnInit() {
      this.getLeaderboard();
    }

    onPage(event) {
      this.page = event;
      this.getLeaderboard();
    }

    getLeaderboard() {
      this.dashboardService.getLeaderboard(this.page).subscribe(response => {
        this.page.length = response.length;
        this.leaderboard = response.rankings;
      })
    }
 

}

