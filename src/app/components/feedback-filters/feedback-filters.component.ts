import { Component, OnInit, Inject } from '@angular/core';
import { FeedbackService } from '../../services/feedback/feedback.service';


@Component({
  selector: 'app-feedback-filters',
  templateUrl: './feedback-filters.component.html',
  styleUrls: ['./feedback-filters.component.css']
})
export class FeedbackFiltersComponent implements OnInit {
  panelOpenState: boolean = false;
  selectedTab = 'likedTab';
  selectedRatings = ["1-star", "2-star", "3-star", "4-star", "5-star"];
  dateSort:string = 'DESC';
  ratingSort:string = "1,2,3,4,5";
  averageScore:number = 0.00;
  totalReviews:number = 0;
  totalPercentages:object[] = [
    {score: 5, percentage: 0},
    {score: 4, percentage: 0},
    {score: 3, percentage: 0},
    {score: 2, percentage: 0},
    {score: 1, percentage: 0}
  ];
  filteredAgent = 'all';
  users;


  reviewRatings:string = '0';
  timeSort = 'NEW';
  
  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.feedbackService.getMyFeedbackScore().subscribe(score => {
      this.averageScore = score.averageScore;
      this.totalPercentages = score.totalPercentages;
      this.totalReviews = score.totalReviews;
    })
  }

  onChangeDateSort(event) {
    this.feedbackService.setDateSort(event.value);
  }

  onChangeRatingSort(event) {
    var array = event.value.split(',').map(Number);
    this.feedbackService.setRatingSort(array);
  }

  onPercentClick(rating) {
    this.ratingSort = rating;
    var array = rating.split(',').map(Number);    
    this.feedbackService.setRatingSort(array);
  }

}
