import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  constructor() { }

  getSingle() {
    return [
      {
        "name": "Feedback",
        "series": [
          {
            "name": "Mar 26",
            "value": 3
          },
          {
            "name": "Mar 28",
            "value": 1
          },
          {
            "name": "Mar 30",
            "value": 4
          },
          {
            "name": "Mar 31",
            "value": 2
          },
          {
            "name": "Apr 01",
            "value": 5
          },
          {
            "name": "Apr 02",
            "value": 3
          },
          {
            "name": "Apr 03",
            "value": 5
          }
        ]
      }
    ]
  }


}
