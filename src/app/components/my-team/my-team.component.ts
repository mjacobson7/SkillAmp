import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
  actionButtons: any[];
  headerButtons: any[];
  users: any[];

  constructor() { }

  ngOnInit() {
    this.actionButtons = [
      {
        action: 'Edit',
        icon: 'mode_edit'
      },
      {
        action: 'Archive',
        icon: 'archive'
      },
      {
        action: 'Delete',
        icon: 'delete'
      }
    ]
    this.headerButtons = [
      {
        title: 'Add User',
        link: '/newUser'
      },
      {
        title: 'Archives',
        link: '/archives'
      }
    ]
    this.users = [
      {
        "id": 1,
        "username": "ryangray",
        "password": "xxxxxxxxxx",
        "firstName": "Ryan",
        "lastName": "Gray",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 1,
        "username": "hannahgray",
        "password": "xxxxxxxxxx",
        "firstName": "Hannah",
        "lastName": "Gray",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 1,
        "username": "corinajacobson",
        "password": "xxxxxxxxxx",
        "firstName": "Corina",
        "lastName": "Jacobson",        
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
