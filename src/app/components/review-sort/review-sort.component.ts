import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-sort',
  templateUrl: './review-sort.component.html',
  styleUrls: ['./review-sort.component.css']
})
export class ReviewSortComponent implements OnInit {
  typeSort = 'rating';
  valueSort = 'recentlyAdded';

  constructor() { }

  ngOnInit() {
  }

}
