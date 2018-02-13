import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;

  constructor(private navService: NavService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }



}
