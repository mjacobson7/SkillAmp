import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[];
  headerButtons: any[];
  actionButtons: any[];

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
        "username": "sushantshrestha",
        "password": "xxxxxxxxxx",
        "firstName": "Sushant",
        "lastName": "Shrestha",        
        "email": "no-reply@test.com",
        "supervisor": "Jake White",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "paulmefford",
        "password": "xxxxxxxxxx",
        "firstName": "Paul",
        "lastName": "Mefford",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User", "Supervisor"]
      },
      {
        "id": 1,
        "username": "mikebenedict",
        "password": "xxxxxxxxxx",
        "firstName": "Mike",
        "lastName": "Benedict",        
        "email": "no-reply@test.com",
        "supervisor": "Paul Mefford",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "mattbehrend",
        "password": "xxxxxxxxxx",
        "firstName": "Matt",
        "lastName": "Behrend",        
        "email": "no-reply@test.com",
        "supervisor": "Jake White",
        "role": ["User", "Supervisor"]
      },
      {
        "id": 1,
        "username": "leaburr",
        "password": "xxxxxxxxxx",
        "firstName": "Lea",
        "lastName": "Burr",        
        "email": "no-reply@test.com",
        "supervisor": "Jake White",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "jordanwoodhouse",
        "password": "xxxxxxxxxx",
        "firstName": "Jordan",
        "lastName": "Woodhouse",        
        "email": "no-reply@test.com",
        "supervisor": "Matt Behrend",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "jaronmathis",
        "password": "xxxxxxxxxx",
        "firstName": "Jaron",
        "lastName": "Mathis",        
        "email": "no-reply@test.com",
        "supervisor": "Jake White",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 1,
        "username": "jakewhite",
        "password": "xxxxxxxxxx",
        "firstName": "Jake",
        "lastName": "White",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 1,
        "username": "chrisduran",
        "password": "xxxxxxxxxx",
        "firstName": "Chris",
        "lastName": "Duran",        
        "email": "no-reply@test.com",
        "supervisor": "Matt Behrend",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "bethanywoodhouse",
        "password": "xxxxxxxxxx",
        "firstName": "Bethany",
        "lastName": "Woodhouse",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "spencerjacox",
        "password": "xxxxxxxxxx",
        "firstName": "Spencer",
        "lastName": "Jacox",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "maxjacobson",
        "password": "xxxxxxxxxx",
        "firstName": "Max",
        "lastName": "Jacobson",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 1,
        "username": "carlywarner",
        "password": "xxxxxxxxxx",
        "firstName": "Carly",
        "lastName": "Warner",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User"]
      },
      {
        "id": 1,
        "username": "brandonhowell",
        "password": "xxxxxxxxxx",
        "firstName": "Brandon",
        "lastName": "Howell",        
        "email": "no-reply@test.com",
        "supervisor": "Matt Behrend",
        "role": ["User"]
      },
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
