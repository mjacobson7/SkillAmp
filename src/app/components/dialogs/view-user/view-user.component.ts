import { User } from './../../../models/user.model';
import { Component, OnInit, Inject } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user: User;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }



}
