import { DeleteUserComponent } from './../../dialogs/delete-user/delete-user.component';
import { ViewUserComponent } from './../../dialogs/view-user/view-user.component';
import { NavService } from './../../../services/nav/nav.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalService, ModalCloseReason } from '@independer/ng-modal';



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
    { label: 'Username', field: 'username', sortable: true },
    { label: 'First Name', field: 'firstName', sortable: true },
    { label: 'Last Name', field: 'lastName', sortable: true }
  ]

  buttonHeader = [
    { label: 'Add User', link: ['user', 'create'] }
  ]

  actionButtons = [
    { icon: 'fa fa-eye', field: 'view', label: 'View' },
    { icon: 'fa fa-pencil', field: 'edit', label: 'Edit' },
    { icon: 'fa fa-close', field: 'delete', label: 'Delete' }
  ]


  constructor(private modalService: ModalService, private userService: UserService, private navService: NavService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();
  }

  onPage(event) {
    this.page = event;
    this.getUsers();
  }

  onButtonClick(event) {
    if (event.field === 'view') {
      this.modalService.open(ViewUserComponent, data => {
        data.user = event.row;
      });
    } else if (event.field === 'edit') {
      this.router.navigate(['/supervisor_tools/manage_users/user', event.row.id]);
    } else if (event.field === 'delete') {
      const modalRef = this.modalService.open(DeleteUserComponent, data => {
        data.user = event.row;
      })
      modalRef.closed.subscribe(args => {
        this.getUsers();
      });
    }
  }

  getUsers() {
    this.userService.getUsersPage(this.page).subscribe(data => {
      this.users = data.content;
      this.page.length = data.length;
      this.page.pageNumber = data.pageNumber;
    })
  }

} //end component
