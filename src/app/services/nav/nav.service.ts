import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class NavService {
    sidenavOpen = new Subject<boolean>();
    pageHeaderTitle = new Subject<Object>();

      constructor() {}

}
