import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Reports',
    icon: 'assignment'
  }

  constructor() { }

  ngOnInit() {
  }

}
