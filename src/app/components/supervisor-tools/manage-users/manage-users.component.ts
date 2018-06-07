import { NavService } from './../../../services/nav/nav.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { ViewUserComponent } from '../../dialogs/view-user/view-user.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: User;
  pageSize: number = 10;
  pageIndex: number = 0;
  length: number;

  constructor(private userService: UserService, private navService: NavService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute) {
    this.getUsers();
  }

  ngOnInit() {}

  getUsers() {
    let params = {
      pageIndex: this.pageIndex
    }

    this.userService.getAllUsers(params).subscribe(users => {
      this.users = users;
    })
  }

  onPageEvent(event) {
    this.pageIndex = event.pageIndex;
    this.getUsers();
  }

  onViewUser(userId) {
    this.userService.getUser(userId).subscribe(user => {
      const modalRef = this.modalService.open(ViewUserComponent);
      modalRef.componentInstance.user = user;
    })
  }

} //end component
