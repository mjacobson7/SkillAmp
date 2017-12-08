import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
