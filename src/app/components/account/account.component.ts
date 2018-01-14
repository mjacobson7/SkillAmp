import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Account Management',
    icon: 'account_balance'
  }

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

}
