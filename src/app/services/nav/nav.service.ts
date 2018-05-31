import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavService {
  sidenavStatus = new BehaviorSubject<boolean>(true);
  mobileView = new BehaviorSubject<boolean>(false);
  pageHeaderTitle = new Subject<Object>();

  constructor(private httpClient: HttpClient) { }

  getSideNavList() {
    return this.httpClient.get<any>('/sideNavList');
  }

}
