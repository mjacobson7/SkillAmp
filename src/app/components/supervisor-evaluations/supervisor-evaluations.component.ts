import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
