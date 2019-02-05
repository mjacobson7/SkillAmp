import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit, OnDestroy {
  user;
  userIdSubscription: Subscription;
  // TODO: Make pageInfo title dynamic so it says 'Create New User' or 'Edit User'
  username;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.paramMap.get('id')
    };
    this.userIdSubscription = this.route.params.subscribe(params => {
      this.user.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
  }


}
