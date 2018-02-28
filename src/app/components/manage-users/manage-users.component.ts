import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Manage Users',
    icon: 'people'
  }

  constructor(private navService: NavService) {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

  ngOnInit() {

  }

}
