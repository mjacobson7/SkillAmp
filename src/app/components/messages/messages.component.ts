import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Messages',
    icon: 'email'
  }

  constructor(private navService: NavService) { }

  ngOnInit() {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

}
