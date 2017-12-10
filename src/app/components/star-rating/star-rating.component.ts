import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  overallRating: number = 8.5;
  numberOfReviews: number = 47;  

  constructor() { }

  ngOnInit() {
  }

}
