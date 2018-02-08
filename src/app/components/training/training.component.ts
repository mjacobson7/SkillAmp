import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Training',
    icon: 'domain'
  }

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

}
