import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from '../../models/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }



}
