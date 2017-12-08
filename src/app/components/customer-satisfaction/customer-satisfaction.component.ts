import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-satisfaction',
  templateUrl: './customer-satisfaction.component.html',
  styleUrls: ['./customer-satisfaction.component.css']
})
export class CustomerSatisfactionComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Customer Satisfaction',
    icon: 'sentiment_very_satisfied'
  }

  constructor() { }

  ngOnInit() {
  }

}
