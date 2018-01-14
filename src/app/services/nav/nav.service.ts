import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";

@Injectable()
export class NavService {
  private sidenavOpenSubject = new Subject<boolean>();
  pageHeaderTitle = new Subject<Object>();
  
      constructor() {}
  
      toggleSideNav(opening: boolean): void {
          this.sidenavOpenSubject.next(opening);
      }
  
      onSideNavToggle(): Observable<boolean> {
          return this.sidenavOpenSubject;
      }

    //   updatePageTitle(title): void {
    //     this.pageHeaderTitle.next(title);
    //   }
}
