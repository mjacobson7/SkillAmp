import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  pageInfo;
  pageInfoSubscription: Subscription

  constructor(private navService: NavService) {}

  ngOnInit() {
    this.pageInfoSubscription = this.navService.pageHeaderTitle.subscribe(
      (pageInfo) => {
        this.pageInfo = pageInfo;
      }
    )
  }

  ngOnDestroy() {
    this.pageInfoSubscription.unsubscribe();
  }

}
