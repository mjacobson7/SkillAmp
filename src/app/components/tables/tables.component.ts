import { Component, OnInit, Input } from '@angular/core';
import {DataTableModule,SharedModule} from 'primeng/primeng';


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

  constructor() { }
  

  actionButton(row):void{      
    console.log(row); 
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
