import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  openSideNav: boolean = true;
  posts: any[];  

  constructor(private mainService: MainService, http: Http) {
    http.get('http://jsonplaceholder.typicode.com/posts')
      .subscribe(response => {
        console.log(response.json());
        this.posts = response.json();
      })
  }

  ngOnInit(): void {
    this.mainService.onSideNavToggle().subscribe(
        (opening) => {
            if (opening) {
              console.log("dashboard open");
                this.openSideNav = true;
            } else {
              console.log("dashboard close");
                this.openSideNav = false;
            }
        }
    );
} 

}
