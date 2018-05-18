import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getUserWidgetData() {
    return this.httpClient.get<any>('/getUserWidgetData');
  }

  getLeaderboard(params) {
    return this.httpClient.post<any>('/team_leaderboard', {params: params});
  }

  getSingle() {
    return [
      {
        "name": "Germany",
        "series": [
          {
            "name": "Feb 28",
            "value": 3
          },
          {
            "name": "Mar 01",
            "value": 1
          },
          {
            "name": "Mar 02",
            "value": 4
          },
          {
            "name": "Mar 03",
            "value": 2
          },
          {
            "name": "Mar 04",
            "value": 5
          },
          {
            "name": "Mar 05",
            "value": 3
          },
          {
            "name": "Mar 06",
            "value": 5
          },
          {
            "name": "Mar 07",
            "value": 3
          },
          // {
          //   "name": "Mar 08",
          //   "value": 1
          // },
          // {
          //   "name": "Mar 09",
          //   "value": 4
          // },
          // {
          //   "name": "Mar 10",
          //   "value": 2
          // },
          // {
          //   "name": "Mar 11",
          //   "value": 5
          // },
          // {
          //   "name": "Mar 12",
          //   "value": 3
          // },
          // {
          //   "name": "Mar 13",
          //   "value": 5
          // },
          // {
          //   "name": "Mar 14",
          //   "value": 3
          // },
          // {
          //   "name": "Mar 15",
          //   "value": 1
          // },
          // {
          //   "name": "Mar 19",
          //   "value": 4
          // },
          // {
          //   "name": "Mar 20",
          //   "value": 2
          // },
          // {
          //   "name": "Mar 21",
          //   "value": 5
          // },
          // {
          //   "name": "Mar 22",
          //   "value": 3
          // },
          // {
          //   "name": "Mar 23",
          //   "value": 5
          // }

        ]
      }
    ]
  }


}
