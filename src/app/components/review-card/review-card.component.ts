import { Component, OnInit, Input } from '@angular/core';
import { SurveyService } from '../../services/survey/survey.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  @Input() survey;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {}

}
