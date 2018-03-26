import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-feedback-filters',
  templateUrl: './feedback-filters.component.html',
  styleUrls: ['./feedback-filters.component.css']
})
export class FeedbackFiltersComponent implements OnInit {
  panelOpenState: boolean = false;
  selectedTab = 'likedTab';
  selectedRatings = ["1-star", "2-star", "3-star", "4-star", "5-star"];
  feedbackDate = 'newestFeedback';
  filteredAgent = 'all';
  users;


  starRatings = 'ALL';
  reviewRatings = 'LIKE';
  timeSort = 'NEW';
  
  constructor() { }

  ngOnInit() {

    this.users = [
      {
        "id": 1,
        "username": "jeffcarter",
        "password": "xxxxxxxxxx",
        "firstName": "Jeff",
        "lastName": "Carter",
        "fullName": "Jeff Carter",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 2,
        "username": "brianhaney",
        "password": "xxxxxxxxxx",
        "firstName": "Brian",
        "lastName": "Haney",
        "fullName": "Brian Haney",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User"]
      },
      {
        "id": 3,
        "username": "ericpeterson",
        "password": "xxxxxxxxxx",
        "firstName": "Eric",
        "lastName": "Peterson",
        "fullName": "Eric Peterson",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User"]
      },
      {
        "id": 4,
        "username": "joeyeva",
        "password": "xxxxxxxxxx",
        "firstName": "Joey",
        "lastName": "Eva",    
        "fullName": "Joey Eva",    
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User"]
      } 
    ]

  }


}
