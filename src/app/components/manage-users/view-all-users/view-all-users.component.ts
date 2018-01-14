import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {
  users: any[];
  headerButtons: any[];
  actionButtons: any[];

  constructor() { }

  ngOnInit() {
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
    this.headerButtons = [
      {
        title: 'Add User',
        link: 'add-user',
      }
    ]
    this.users = [
      {
        "id": 6663837723051043,
        "username": "sushantshrestha",
        "password": "xxxxxxxxxx",
        "firstName": "Sushant",
        "lastName": "Shrestha",        
        "email": "no-reply@test.com",
        "supervisor": "Jake White",
        "role": ["User"]
      },
      {
        "id": 47708972843789055,
        "username": "paulmefford",
        "password": "xxxxxxxxxx",
        "firstName": "Paul",
        "lastName": "Mefford",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User", "Supervisor"]
      },
      {
        "id": 3655422560714665,
        "username": "mikebenedict",
        "password": "xxxxxxxxxx",
        "firstName": "Mike",
        "lastName": "Benedict",        
        "email": "no-reply@test.com",
        "supervisor": "Paul Mefford",
        "role": ["User"]
      },
      {
        "id": 8693569920926425,
        "username": "mattbehrend",
        "password": "xxxxxxxxxx",
        "firstName": "Matt",
        "lastName": "Behrend",        
        "email": "no-reply@test.com",
        "supervisor": "Jake White",
        "role": ["User", "Supervisor"]
      },
      {
        "id": 8384192241158752,
        "username": "leaburr",
        "password": "xxxxxxxxxx",
        "firstName": "Lea",
        "lastName": "Burr",        
        "email": "no-reply@test.com",
        "supervisor": "Jake White",
        "role": ["User"]
      },
      {
        "id": 759708504687054,
        "username": "jordanwoodhouse",
        "password": "xxxxxxxxxx",
        "firstName": "Jordan",
        "lastName": "Woodhouse",        
        "email": "no-reply@test.com",
        "supervisor": "Matt Behrend",
        "role": ["User"]
      },
      {
        "id": 4372565600874534,
        "username": "jaronmathis",
        "password": "xxxxxxxxxx",
        "firstName": "Jaron",
        "lastName": "Mathis",        
        "email": "no-reply@test.com",
        "supervisor": "Jake White",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 9077587213845573,
        "username": "jakewhite",
        "password": "xxxxxxxxxx",
        "firstName": "Jake",
        "lastName": "White",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 8556421987327858,
        "username": "chrisduran",
        "password": "xxxxxxxxxx",
        "firstName": "Chris",
        "lastName": "Duran",        
        "email": "no-reply@test.com",
        "supervisor": "Matt Behrend",
        "role": ["User"]
      },
      {
        "id": 47760311725399385,
        "username": "bethanywoodhouse",
        "password": "xxxxxxxxxx",
        "firstName": "Bethany",
        "lastName": "Woodhouse",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User"]
      },
      {
        "id": 2547668669021208,
        "username": "spencerjacox",
        "password": "xxxxxxxxxx",
        "firstName": "Spencer",
        "lastName": "Jacox",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User"]
      },
      {
        "id": 8104712517262154,
        "username": "maxjacobson",
        "password": "xxxxxxxxxx",
        "firstName": "Max",
        "lastName": "Jacobson",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 9323004645030442,
        "username": "carlywarner",
        "password": "xxxxxxxxxx",
        "firstName": "Carly",
        "lastName": "Warner",        
        "email": "no-reply@test.com",
        "supervisor": "Jaron Mathis",
        "role": ["User"]
      },
      {
        "id": 10295023261417513,
        "username": "brandonhowell",
        "password": "xxxxxxxxxx",
        "firstName": "Brandon",
        "lastName": "Howell",        
        "email": "no-reply@test.com",
        "supervisor": "Matt Behrend",
        "role": ["User"]
      },
      {
        "id": 33409146553110314,
        "username": "ryangray",
        "password": "xxxxxxxxxx",
        "firstName": "Ryan",
        "lastName": "Gray",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User", "Supervisor", "Admin"]
      },
      {
        "id": 5662258291129545,
        "username": "brianhaney",
        "password": "xxxxxxxxxx",
        "firstName": "Brian",
        "lastName": "Haney",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User"]
      },
      {
        "id": 749515889348636,
        "username": "ericpeterson",
        "password": "xxxxxxxxxx",
        "firstName": "Eric",
        "lastName": "Peterson",        
        "email": "no-reply@test.com",
        "supervisor": "",
        "role": ["User"]
      },
      {
        "id": 45346812385700686,
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
