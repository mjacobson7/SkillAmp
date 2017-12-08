import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.css']
})
export class GlobalSettingsComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Global Settings',
    icon: 'settings'
  }

  constructor() { }

  ngOnInit() {
  }

}
