import { NavService } from './../../../services/nav/nav.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { ViewUserComponent } from '../../dialogs/view-user/view-user.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { SuperTable } from 'ngx-super-table';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: User;

  page = {
    pageSize: 10,
    length: null,
    pageNumber: 1,
    orderBy: 'username',
    orderDir: 'ASC',
    searchText: ''
  };

  columns = [
    {label: 'Username', field: 'username', sortable: true},
    {label: 'First Name', field: 'firstName', sortable: true},
    {label: 'Last Name', field: 'lastName', sortable: true}
  ]

  buttonHeader = [
    {label: 'Add User', link: ['user', 'create']}
  ]

  actionButtons = [
    {icon: 'fa fa-eye', field: 'view' },
    {icon: 'fa fa-pencil', field: 'edit' },
    {icon: 'fa fa-close', field: 'delete' }
  ]


  constructor(private userService: UserService, private navService: NavService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() { 
    this.getUsers();
  }

  onPage(event) {
    this.page = event;
    this.getUsers();
  }

  onButtonClick(event) {
    if(event.field === 'view') {
      console.log("View");
    } else if(event.field === 'edit') {
      this.router.navigate(['/supervisor_tools/manage_users/user', event.row.id]);
    } else if(event.field === 'delete') {
      console.log("Delete");
    }
  }

  getUsers() {
    this.userService.getUsersPage(this.page).subscribe(data => {
      this.users = data.content;
      this.page.length = data.length;
      this.page.pageNumber = data.pageNumber;
    })
  }

  onViewUser(userId) {
    this.userService.getUser(userId).subscribe(user => {
      const modalRef = this.modalService.open(ViewUserComponent);
      modalRef.componentInstance.user = user;
    })
  }

} //end component
