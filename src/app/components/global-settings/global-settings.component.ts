import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.css']
})
export class GlobalSettingsComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Global Settings',
    icon: 'settings'
  };

  constructor(private navService: NavService) {
    this.navService.pageHeaderTitle.next(this.pageInfo);
  }

  ngOnInit() {

  }

}
