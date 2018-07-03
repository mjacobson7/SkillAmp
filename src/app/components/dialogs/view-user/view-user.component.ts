import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ModalRef } from '@independer/ng-modal';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  user: User;

  constructor(private modal: ModalRef) { }

  ngOnInit() {
    console.log(this.user);
  }

  close() {
    this.modal.close();
  }

}
