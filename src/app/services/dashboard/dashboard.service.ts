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
 
  getLeaderboard(params) {
    return this.httpClient.post<any>('/team_leaderboard', { params: params });
  }

  getSurveyChartData(params) {
    return this.httpClient.post<any>('/survey_chart_data', params);
  }

}
