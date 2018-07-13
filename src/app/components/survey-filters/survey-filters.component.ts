import { Component, OnInit, Inject } from '@angular/core';
import { SurveyService } from '../../services/survey/survey.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-survey-filters',
  templateUrl: './survey-filters.component.html',
  styleUrls: ['./survey-filters.component.scss']
})
export class SurveyFiltersComponent implements OnInit {
  panelOpenState: boolean = false;
  selectedTab = 'likedTab';
  selectedRatings = ["1-star", "2-star", "3-star", "4-star", "5-star"];
  dateSort: string = 'DESC';
  ratingSort: string = "1,2,3,4,5";
  averageScore: number = 0.00;
  totalReviews: number = 0;
  totalPercentages: object[] = [
    { score: 5, percentage: 0 },
    { score: 4, percentage: 0 },
    { score: 3, percentage: 0 },
    { score: 2, percentage: 0 },
    { score: 1, percentage: 0 }
  ];
  filteredAgent = 'all';
  canSortByAgent: boolean = false;
  agents;


  reviewRatings: string = '0';
  timeSort = 'NEW';

  constructor(private surveyService: SurveyService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.data['isAdmin']) {
      this.getAllSurveyScore();
      this.getAllAgentsDropdown();
      this.canSortByAgent = true;
    }
    else if (this.route.snapshot.data['isSupervisor']) {
      this.getTeamSurveyScore();
      this.getTeamDropdown();
      this.canSortByAgent = true;
    }
    else if (this.route.snapshot.data['isUser']) {
      this.getMySurveyScore();
    }
  }

  getAllAgentsDropdown() {
    this.userService.getAllAgentsDropdown().subscribe(agents => {
      this.agents = agents;
    })
  }

  getTeamDropdown() {
    this.userService.getTeamDropdown().subscribe(agents => {
      this.agents= agents;
    })
  }

  getMySurveyScore() {
    this.surveyService.getMySurveyScore().subscribe(score => {
      this.averageScore = score.averageScore;
      this.totalPercentages = score.totalPercentages;
      this.totalReviews = score.totalReviews;
    })
  }

  getTeamSurveyScore() {
    this.surveyService.getTeamSurveyScore().subscribe(score => {
      this.averageScore = score.averageScore;
      this.totalPercentages = score.totalPercentages;
      this.totalReviews = score.totalReviews;
    })
  }

  getAllSurveyScore() {
    this.surveyService.getAllSurveyScore().subscribe(score => {
      this.averageScore = score.averageScore;
      this.totalPercentages = score.totalPercentages;
      this.totalReviews = score.totalReviews;
    })
  }

  onChangeDateSort(event) {
    this.surveyService.setDateSort(event.value);
  }

  onChangeRatingSort(event) {
    var array = event.value.split(',').map(Number);
    this.surveyService.setRatingSort(array);
  }

  onChangeAgentSort(id) {
    this.surveyService.setAgentSort(id);
  }

  onPercentClick(rating) {
    this.ratingSort = rating;
    var array = rating.split(',').map(Number);
    this.surveyService.setRatingSort(array);
  }

}
