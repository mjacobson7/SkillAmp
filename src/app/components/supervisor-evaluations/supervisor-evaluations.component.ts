import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-supervisor-evaluations',
  templateUrl: './supervisor-evaluations.component.html',
  styleUrls: ['./supervisor-evaluations.component.css']
})
export class SupervisorEvaluationsComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Supervisor Evaluations',
    icon: 'domain'
  }

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

}
