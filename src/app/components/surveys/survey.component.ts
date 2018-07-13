import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { SurveyService } from '../../services/survey/survey.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  // pageIndex: number = 0;
  // pageSize: number = 10;
  // ratingSort: number[] = [1, 2, 3, 4, 5];
  // dateSort: string = 'DESC';
  // agentSort: number;
  length: number;
  survey;
  reviewTotals;
  overallRating;
  surveysLoaded: Boolean = false;

  params = {
    pageIndex: <number> 0,
    pageSize: <number> 10,
    ratingSort: <number[]> [1, 2, 3, 4, 5],
    dateSort: <string> 'DESC',
    agentSort: <number> undefined
  }

  constructor(private navService: NavService, private surveyService: SurveyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSurveyData();
    this.getSortFilterData();
  }

  getSortFilterData() {
    this.surveyService.getDateSort().subscribe(dateSort => {
      this.params.dateSort = dateSort;
      this.getSurveyData();
    })
    this.surveyService.getRatingSort().subscribe(ratingSort => {
      this.params.ratingSort = ratingSort;
      this.getSurveyData();
    })

    this.surveyService.getAgentSort().subscribe(agentSort => {
      this.params.agentSort = agentSort;
      this.getSurveyData();
    })
  }

  getSurveyData() {
    if (this.route.snapshot.data['isAdmin']) {
      this.getAllSurveysPage();
    }
    else if (this.route.snapshot.data['isSupervisor']) {
      this.getTeamSurveysPage();
    }
    else if (this.route.snapshot.data['isUser']) {
      this.getMySurveysPage();
    }
  }

  //I don't think this is being used so I'm commenting it out to see for sure
  // onRatingSort(ratingSort) {
  //   this.ratingSort = ratingSort;
  //   this.getSurveyData();
  // }

  onPageEvent(event) {
    this.params.pageIndex = event.pageIndex;
    this.params.pageSize = event.pageSize;
    this.getSurveyData();
  }



  getMySurveysPage() {
    this.surveyService.getMySurveysPage(this.params).subscribe(surveys => {
      this.survey = surveys.content;
      this.length = surveys.length;
      this.surveysLoaded = true;
    });
  }

  getTeamSurveysPage() {
    this.surveyService.getTeamSurveysPage(this.params).subscribe(surveys => {
      this.survey = surveys.content;
      this.length = surveys.length;
      this.surveysLoaded = true;
    })
  }

  getAllSurveysPage() {
    this.surveyService.getAllSurveysPage(this.params).subscribe(surveys => {
      this.survey = surveys.content;
      this.length = surveys.length;
      this.surveysLoaded = true;
    })
  }
}
