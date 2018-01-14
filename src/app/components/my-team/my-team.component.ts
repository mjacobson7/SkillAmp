import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  actionButtons: any[];
  users: any[];
  pageInfo: {title: string, icon: string} = {
    title: 'My Team',
    icon: 'people'
  }

  constructor(private navService: NavService) { }

  ngOnInit() {

    this.navService.pageHeaderTitle.next(this.pageInfo);
    
    this.actionButtons = [
      {
        action: 'Performance',
        icon: 'assessment'
      },
      {
        action: 'Edit',
        icon: 'mode_edit'
      },
      {
        action: 'Delete',
        icon: 'delete'
      }
    ]
    this.users = [
      {
        "id": 1,
        "username": "jeffcarter",
        "password": "xxxxxxxxxx",
        "firstName": "Jeff",
        "lastName": "Carter",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 1,
        "username": "brianhaney",
        "password": "xxxxxxxxxx",
        "firstName": "Brian",
        "lastName": "Haney",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "ericpeterson",
        "password": "xxxxxxxxxx",
        "firstName": "Eric",
        "lastName": "Peterson",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "joeyeva",
        "password": "xxxxxxxxxx",
        "firstName": "Joey",
        "lastName": "Eva",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User"]
      } 
    ]
  }

}
