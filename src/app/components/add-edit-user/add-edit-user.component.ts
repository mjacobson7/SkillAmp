import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  user: {};
  // TODO: Make pageInfo title dynamic so it says 'Create New User' or 'Edit User'  
  pageInfo: {title: string, icon: string} = {
    title: 'User', 
    icon: 'person'
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.paramMap.get('id')      
    }
    console.log(this.user);
  }


}
