import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnChanges {
  leaderboard: any[];
  @Input() dashboardView;

  page = {
    pageSize: 10,
    length: null,
    pageNumber: 1,
    orderBy: 'rank',
    orderDir: 'ASC',
    searchText: ''
  };

  columns = [
    { label: 'Rank', field: 'rank', sortable: false },
    { label: 'Average Score', field: 'averageScore', sortable: false },
    { label: 'Username', field: 'username', sortable: false },
    { label: 'First Name', field: 'firstName', sortable: false },
    { label: 'Last Name', field: 'lastName', sortable: false }
  ];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dashboardView !== undefined && changes.dashboardView.previousValue !== changes.dashboardView.currentValue) {
        this.getLeaderboard(changes.dashboardView.currentValue);
    }
  }

  onPage(event) {
    this.page = event;
    this.getLeaderboard(this.dashboardView);
  }

  getLeaderboard(view) {
    this.dashboardService.getLeaderboard(view, this.page).subscribe(response => {
      this.page.length = response.length;
      this.leaderboard = response.rankings;
    });
  }


}

