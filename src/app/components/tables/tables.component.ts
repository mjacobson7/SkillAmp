import { Component, OnInit, Input } from '@angular/core';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  @Input() users: any[];
  @Input() headerButtons: any[];
  @Input() actionButtons: any[];
  autoResizeTable: boolean;
  // selectedUsers: any[]; --is this used for anything?

  constructor(private route: Router) { }
  

  actionButton(user):void{      
    console.log(user); 
    this.route.navigate(['manage_users/edit_user/' + user.id]);
    // TODO: We need to specify that this doesn't route all action buttons to the same route
}

  ngOnInit() {
  }

  onResize(event) {
    if(event.target.innerWidth > 950) {
      this.autoResizeTable = false;
    } else {
      this.autoResizeTable = true;
    }
  }

  


}
