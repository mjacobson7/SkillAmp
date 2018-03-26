import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

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

  constructor(private navService: NavService) {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

  ngOnInit() {
  }

}
