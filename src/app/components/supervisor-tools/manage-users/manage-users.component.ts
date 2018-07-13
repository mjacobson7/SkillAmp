import { AuthService } from './../../../services/auth/auth.service';
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
  actionButtons: Object[] = [];
  headerButton: Object[] = [];

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

  constructor(private modalService: ModalService, private authService: AuthService, private userService: UserService, private navService: NavService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();
    this.getActionButtons();
    this.getHeaderButtons();
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
      if(this.route.snapshot.data['isAdmin']) {
        this.router.navigate(['/admin_tools/manage_users/user', event.row.id]);
      }
      else if(this.route.snapshot.data['isSupervisor']) {
        this.router.navigate(['/supervisor_tools/my_team/user', event.row.id]);
      }
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
    if (this.route.snapshot.data['isAdmin']) {
      this.userService.getUsersPage(this.page).subscribe(data => {
        this.users = data.content;
        this.page.length = data.length;
        this.page.pageNumber = data.pageNumber;
      })
    }
    else if (this.route.snapshot.data['isSupervisor']) {
      this.userService.getTeamPage(this.page).subscribe(data => {
        this.users = data.content;
        this.page.length = data.length;
        this.page.pageNumber = data.pageNumber;
      })
    }
  }

  getHeaderButtons() {
    if(this.authService.hasPermission('CAN_CREATE_USERS') && this.route.snapshot.data['isAdmin']) {
      this.headerButton.push({ label: 'Add User', link: ['user', 'create'] });
    }
  }

  getActionButtons() {
    this.actionButtons.push({ icon: 'fa fa-eye', field: 'view', label: 'View' });

    if (this.authService.hasPermission('CAN_EDIT_USERS') && this.route.snapshot.data['isAdmin']) {
      this.actionButtons.push(
        { icon: 'fa fa-pencil', field: 'edit', label: 'Edit' },
        { icon: 'fa fa-close', field: 'delete', label: 'Delete' })
    }
  }

} //end component
