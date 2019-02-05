import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject ,  Observable } from 'rxjs';

@Injectable()
export class SurveyService {
  private dateSort = new Subject<string>();
  private ratingSort = new Subject<number[]>();
  private agentSort = new Subject<number>();

  constructor(private httpClient: HttpClient) { }

  getDateSort(): Observable<string> {
    return this.dateSort.asObservable();
  }
  setDateSort(dateSort:string):void {
    this.dateSort.next(dateSort);
  }

  getRatingSort(): Observable<number[]> {
    return this.ratingSort.asObservable();
  }
  setRatingSort(ratingSort:number[]):void {
    this.ratingSort.next(ratingSort);
  }

  getAgentSort(): Observable<number> {
    return this.agentSort.asObservable();
  }

  setAgentSort(agentSort:number):void {
    this.agentSort.next(agentSort);
  }

  getMySurveysPage(params) {
    return this.httpClient.post<any>('/getMySurveysPage' + '?pageIndex=' + params.pageIndex + '&pageSize=' + params.pageSize + '&dateSort=' + params.dateSort, {params: params});
  }

  getTeamSurveysPage(params) {
    return this.httpClient.post<any>('/getTeamSurveysPage' + '?pageIndex=' + params.pageIndex + '&pageSize=' + params.pageSize + '&dateSort=' + params.dateSort + '&agentSort=' + params.agentSort, {params: params});
  } 

  getAllSurveysPage(params) {
    return this.httpClient.post<any>('/getAllSurveysPage' + '?pageIndex=' + params.pageIndex + '&pageSize=' + params.pageSize + '&dateSort=' + params.dateSort + '&agentSort=' + params.agentSort, {params: params});
  }

  getMySurveyScore() {
    return this.httpClient.get<any>('/getMySurveyScore');
  }

  getTeamSurveyScore() {
    return this.httpClient.get<any>('/getTeamSurveyScore');
  }

  getAllSurveyScore() {
    return this.httpClient.get<any>('/getAllSurveyScore');
  }


}
