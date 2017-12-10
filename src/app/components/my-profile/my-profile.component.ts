import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: {};
  passwordChange: boolean = false;  
  pageInfo: {title: string, icon: string} = {
    title: 'My Profile',
    icon: 'person'
  }

  constructor() { }

  ngOnInit() {
    this.user = {
      profilePicture: 'https://images.unsplash.com/photo-1506919258185-6078bba55d2a?auto=format&fit=crop&w=2915&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      id: 452975864567653623,
      username: 'jeffdavis',
      firstName: 'Jeff',
      lastName: 'Davis',
      email: 'jeffdavis@gmail.com',
      roles: ['User', 'Supervisor', 'Admin'],
      supervisor: {
        id: 234524363564563425,
        username: 'caseypeterson',
        firstName: 'Casey',
        lastName: 'Peterson',
        fullName: 'Casey Peterson',
        email: 'caseypeterson@gmail.com'
      }
    }
  }

  onChangePassword() {
    this.passwordChange = !this.passwordChange;
  }

}
