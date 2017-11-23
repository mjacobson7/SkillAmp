import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";

@Injectable()
export class MainService {
  private sidenavOpenSubject : Subject<boolean>;
  
      constructor() {
          this.sidenavOpenSubject = new Subject<boolean>();
      }
  
      toggleSideNav(opening: boolean): void {
          this.sidenavOpenSubject.next(opening);
      }
  
      onSideNavToggle(): Observable<boolean> {
          return this.sidenavOpenSubject;
      }
}
