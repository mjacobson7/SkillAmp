import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyService {
  private dateSort = new Subject<string>();
  private ratingSort = new Subject<number[]>();

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

  getMySurveys(params) {
    return this.httpClient.post<any>('/getMySurveys' + '?pageIndex=' + params.pageIndex + '&pageSize=' + params.pageSize + '&dateSort=' + params.dateSort, {params: params});
  }

  getMySurveyScore() {
    return this.httpClient.get<any>('./getMySurveyScore');
  }


}
