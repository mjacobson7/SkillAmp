import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { SurveyService } from '../../services/survey/survey.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  pageIndex: number = 0;
  pageSize: number = 10;
  ratingSort: number[] = [1, 2, 3, 4, 5];
  dateSort: string = 'DESC';
  length: number;
  survey;
  reviewTotals;
  overallRating;
  surveysLoaded: Boolean = false;
  surveySubscription: Subscription;
  dateSortSubscription: Subscription;
  ratingSortSubscription: Subscription;

  constructor(private navService: NavService, private surveyService: SurveyService) {
    this.getSurveyPage();
    this.surveyService.getDateSort().subscribe(dateSort => {
      this.dateSort = dateSort;
      this.getSurveyPage();
    })
    this.surveyService.getRatingSort().subscribe(ratingSort => {
      this.ratingSort = ratingSort;
      this.getSurveyPage();
    })
  }

  ngOnInit() { }

  onRatingSort(ratingSort) {
    this.ratingSort = ratingSort;
    this.getSurveyPage();
  }

  onPageEvent(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getSurveyPage();
  }

  getSurveyPage() {
    let params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      ratingSort: this.ratingSort,
      dateSort: this.dateSort
    }
    this.surveyService.getMySurveys(params).subscribe(survey => {
        this.survey = survey.content;
        this.length = survey.length;
        this.surveysLoaded = true;
      });
    return event;
  }

  ngOnDestroy() { }

}
