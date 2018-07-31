import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getAdminWidgets() {
    return this.httpClient.get<any>('/getAdminWidgets');
  }

  getSupervisorWidgets() {
    return this.httpClient.get<any>('/getSupervisorWidgets');
  }

  getAgentWidgets() {
    return this.httpClient.get<any>('/getAgentWidgets');
  }

  getLeaderboard(view, params) {
    return this.httpClient.post<any>('/teamLeaderboard', { params: params, view: view });
  }

  getSurveyChartData(view, daysFilter) {
    return this.httpClient.post<any>('/surveyChartData', { view, daysFilter });
  }

}
