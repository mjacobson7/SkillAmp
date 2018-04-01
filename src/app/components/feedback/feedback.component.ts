import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  pageInfo: { title: string, icon: string } = {
    title: 'Feedback',
    icon: 'sentiment_very_satisfied'
  };

  pageIndex: number = 0;
  pageSize: number = 15;
  ratingSort: number[] = [1, 2, 3, 4, 5];
  dateSort: string = 'DESC';
  length: number;
  feedback;

  // pageEvent;
  // datasource: null;

  reviewTotals;
  overallRating;
  feedbackSubscription: Subscription;
  dateSortSubscription: Subscription;
  ratingSortSubscription: Subscription;

  constructor(private navService: NavService, private feedbackService: FeedbackService) {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

  ngOnInit() {
    this.getFeedbackPage();
    this.dateSortSubscription = this.feedbackService.getDateSort().subscribe(dateSort => {
      this.dateSort = dateSort;
      this.getFeedbackPage();
    })
    this.ratingSortSubscription = this.feedbackService.getRatingSort().subscribe(ratingSort => {
      this.ratingSort = ratingSort;
      this.getFeedbackPage();
    })
  }

  onRatingSort(ratingSort) {
    this.ratingSort = ratingSort;
    this.getFeedbackPage();
  }

  onPageEvent(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getFeedbackPage();
  }

  getFeedbackPage() {
    let params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ratingSort: this.ratingSort,
      dateSort: this.dateSort
    }
    this.feedbackSubscription = this.feedbackService.getMyFeedback(params)
      .subscribe(feedback => {
        this.feedback = feedback.content;
        this.length = feedback.length;
      });
    return event;
  }

  ngOnDestroy() {
    this.feedbackSubscription.unsubscribe();
    this.dateSortSubscription.unsubscribe();
    this.ratingSortSubscription.unsubscribe();
  }

}
