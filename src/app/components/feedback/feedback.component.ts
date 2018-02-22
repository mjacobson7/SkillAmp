import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import {FeedbackService} from '../../services/feedback/feedback.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  pageInfo: {title: string, icon: string} = {
    title: 'Feedback',
    icon: 'sentiment_very_satisfied'
  };
  feedback;
  reviewTotals;
  overallRating;
  feedbackSubscription: Subscription;

  constructor(private navService: NavService, private feedbackService: FeedbackService) { }

  ngOnInit() {

    this.navService.pageHeaderTitle.next(this.pageInfo);

    this.feedbackSubscription = this.feedbackService.getMyFeedback().subscribe((feedback) => {
      console.log(feedback);
      this.feedback = feedback;
    });

    this.reviewTotals = {
      overallRating: 4.50,
      reviewsCount: 7
    };

  }

  ngOnDestroy() {
    this.feedbackSubscription.unsubscribe();
  }

}
