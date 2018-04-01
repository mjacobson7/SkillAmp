import { Component, OnInit, Input } from '@angular/core';
import { FeedbackService } from '../../services/feedback/feedback.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  @Input() feedback;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {}

}
