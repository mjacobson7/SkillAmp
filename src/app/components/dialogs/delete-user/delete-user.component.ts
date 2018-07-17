import { UserService } from './../../../services/user/user.service';
import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ModalRef } from '@independer/ng-modal';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  user: User;
  confirmDelete;

  constructor(private modal: ModalRef, private userService: UserService) { }

  ngOnInit() {}

  onDelete(userId) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.close();
    })
  }

  close() {
    this.modal.close();
  }

}
