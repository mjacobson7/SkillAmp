import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { NavService } from '../../../services/nav/nav.service';
import { ViewUserComponent } from '../../dialogs/view-user/view-user.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  pageInfo: { title: string, icon: string } = {
    title: 'Manage Users',
    icon: 'people'
  }
  users: User;

  constructor(private userService: UserService, private navService: NavService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute) {
    this.navService.pageHeaderTitle.next(this.pageInfo);
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }

  ngOnInit() { }

  onViewUser(userId) {
    this.userService.getUser(userId).subscribe(user => {
      const modalRef = this.modalService.open(ViewUserComponent);
      modalRef.componentInstance.user = user;
    })
  }

}
