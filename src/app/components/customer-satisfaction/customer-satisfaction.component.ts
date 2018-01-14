import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav/nav.service';

@Component({
  selector: 'app-customer-satisfaction',
  templateUrl: './customer-satisfaction.component.html',
  styleUrls: ['./customer-satisfaction.component.css']
})
export class CustomerSatisfactionComponent implements OnInit {
  pageInfo: {title: string, icon: string} = {
    title: 'Customer Satisfaction',
    icon: 'sentiment_very_satisfied'
  }
  reviews: [{}];
  reviewTotals: {};

  constructor(private navService: NavService) { }

  ngOnInit() {

    this.navService.pageHeaderTitle.next(this.pageInfo);

    this.reviewTotals = {
      overallRating: 4.50,
      reviewsCount: 7
    }

    this.reviews = [
      {
        userId: 2345293847123413,
        rating: {
          overallRating: 3.5,
          recommendRating: 4,
          politenessRating: 3,
          helpfulnessRating: 3,
          trustworthyRating: 4
        },
        liked: 'Duis lobortis luctus iaculis. Fusce quis lorem aliquam, luctus sem a, eleifend quam. Curabitur at accumsan turpis. Suspendisse nec elementum eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla convallis rhoncus velit, ultrices aliquet tortor rutrum vel. Ut faucibus in nibh sed molestie. Donec finibus elit vitae nisi ornare convallis.',
        disliked: 'Curabitur auctor risus in neque venenatis tristique. Proin dictum, purus et vulputate finibus, nibh ex pellentesque tortor, vel maximus justo libero sed mauris. Cras ornare ultrices interdum. Nam et mi auctor, laoreet nibh sed, dictum leo. Quisque quis justo sed justo tempor viverra at at magna. Curabitur facilisis nisi quis dapibus euismod.',
        productDesc: 'Nullam nunc quam, lacinia non velit id, dapibus lacinia felis. Praesent ut enim dui. Quisque sapien justo, lacinia ut finibus quis, auctor eget ipsum. Morbi dui lacus, efficitur sollicitudin imperdiet vitae, laoreet id urna. Phasellus urna quam, vehicula vel pulvinar nec, vestibulum at urna. Mauris in laoreet tellus.',
        dateOfRating: '2017-11-22'
      },
      {
        userId: 2345293847123413,
        rating: {
          overallRating: 4.5,
          recommendRating: 5,
          politenessRating: 5,
          helpfulnessRating: 4,
          trustworthyRating: 5
        },
        liked: 'Duis lobortis luctus iaculis. Fusce quis lorem aliquam, luctus sem a, eleifend quam. Curabitur at accumsan turpis. Suspendisse nec elementum eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla convallis rhoncus velit, ultrices aliquet tortor rutrum vel. Ut faucibus in nibh sed molestie. Donec finibus elit vitae nisi ornare convallis.',
        disliked: 'Curabitur auctor risus in neque venenatis tristique. Proin dictum, purus et vulputate finibus, nibh ex pellentesque tortor, vel maximus justo libero sed mauris. Cras ornare ultrices interdum. Nam et mi auctor, laoreet nibh sed, dictum leo. Quisque quis justo sed justo tempor viverra at at magna. Curabitur facilisis nisi quis dapibus euismod.',
        productDesc: 'Nullam nunc quam, lacinia non velit id, dapibus lacinia felis. Praesent ut enim dui. Quisque sapien justo, lacinia ut finibus quis, auctor eget ipsum. Morbi dui lacus, efficitur sollicitudin imperdiet vitae, laoreet id urna. Phasellus urna quam, vehicula vel pulvinar nec, vestibulum at urna. Mauris in laoreet tellus.',
        dateOfRating: '2017-11-10'
      },
      {
        userId: 2345293847123413,
        rating: {
          overallRating: 3.25,
          recommendRating: 2,
          politenessRating: 3,
          helpfulnessRating: 2,
          trustworthyRating: 3
        },
        liked: 'Duis lobortis luctus iaculis. Fusce quis lorem aliquam, luctus sem a, eleifend quam. Curabitur at accumsan turpis. Suspendisse nec elementum eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla convallis rhoncus velit, ultrices aliquet tortor rutrum vel. Ut faucibus in nibh sed molestie. Donec finibus elit vitae nisi ornare convallis.',
        disliked: 'Curabitur auctor risus in neque venenatis tristique. Proin dictum, purus et vulputate finibus, nibh ex pellentesque tortor, vel maximus justo libero sed mauris. Cras ornare ultrices interdum. Nam et mi auctor, laoreet nibh sed, dictum leo. Quisque quis justo sed justo tempor viverra at at magna. Curabitur facilisis nisi quis dapibus euismod.',
        productDesc: 'Nullam nunc quam, lacinia non velit id, dapibus lacinia felis. Praesent ut enim dui. Quisque sapien justo, lacinia ut finibus quis, auctor eget ipsum. Morbi dui lacus, efficitur sollicitudin imperdiet vitae, laoreet id urna. Phasellus urna quam, vehicula vel pulvinar nec, vestibulum at urna. Mauris in laoreet tellus.',
        dateOfRating: '2017-11-05'
      },
      {
        userId: 2345293847123413,
        rating: {
          overallRating: 2.5,
          recommendRating: 2,
          politenessRating: 1,
          helpfulnessRating: 2,
          trustworthyRating: 2
        },
        liked: 'Duis lobortis luctus iaculis. Fusce quis lorem aliquam, luctus sem a, eleifend quam. Curabitur at accumsan turpis. Suspendisse nec elementum eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla convallis rhoncus velit, ultrices aliquet tortor rutrum vel. Ut faucibus in nibh sed molestie. Donec finibus elit vitae nisi ornare convallis.',
        disliked: 'Curabitur auctor risus in neque venenatis tristique. Proin dictum, purus et vulputate finibus, nibh ex pellentesque tortor, vel maximus justo libero sed mauris. Cras ornare ultrices interdum. Nam et mi auctor, laoreet nibh sed, dictum leo. Quisque quis justo sed justo tempor viverra at at magna. Curabitur facilisis nisi quis dapibus euismod.',
        productDesc: 'Nullam nunc quam, lacinia non velit id, dapibus lacinia felis. Praesent ut enim dui. Quisque sapien justo, lacinia ut finibus quis, auctor eget ipsum. Morbi dui lacus, efficitur sollicitudin imperdiet vitae, laoreet id urna. Phasellus urna quam, vehicula vel pulvinar nec, vestibulum at urna. Mauris in laoreet tellus.',
        dateOfRating: '2017-10-25'
      },
      {
        userId: 2345293847123413,
        rating: {
          overallRating: 5,
          recommendRating: 5,
          politenessRating: 5,
          helpfulnessRating: 5,
          trustworthyRating: 5
        },
        liked: 'Duis lobortis luctus iaculis. Fusce quis lorem aliquam, luctus sem a, eleifend quam. Curabitur at accumsan turpis. Suspendisse nec elementum eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla convallis rhoncus velit, ultrices aliquet tortor rutrum vel. Ut faucibus in nibh sed molestie. Donec finibus elit vitae nisi ornare convallis.',
        disliked: 'Curabitur auctor risus in neque venenatis tristique. Proin dictum, purus et vulputate finibus, nibh ex pellentesque tortor, vel maximus justo libero sed mauris. Cras ornare ultrices interdum. Nam et mi auctor, laoreet nibh sed, dictum leo. Quisque quis justo sed justo tempor viverra at at magna. Curabitur facilisis nisi quis dapibus euismod.',
        productDesc: 'Nullam nunc quam, lacinia non velit id, dapibus lacinia felis. Praesent ut enim dui. Quisque sapien justo, lacinia ut finibus quis, auctor eget ipsum. Morbi dui lacus, efficitur sollicitudin imperdiet vitae, laoreet id urna. Phasellus urna quam, vehicula vel pulvinar nec, vestibulum at urna. Mauris in laoreet tellus.',
        dateOfRating: '2017-10-23'
      },
      {
        userId: 2345293847123413,
        rating: {
          overallRating: 4,
          recommendRating: 4,
          politenessRating: 4,
          helpfulnessRating: 4,
          trustworthyRating: 4
        },
        liked: 'Duis lobortis luctus iaculis. Fusce quis lorem aliquam, luctus sem a, eleifend quam. Curabitur at accumsan turpis. Suspendisse nec elementum eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla convallis rhoncus velit, ultrices aliquet tortor rutrum vel. Ut faucibus in nibh sed molestie. Donec finibus elit vitae nisi ornare convallis.',
        disliked: 'Curabitur auctor risus in neque venenatis tristique. Proin dictum, purus et vulputate finibus, nibh ex pellentesque tortor, vel maximus justo libero sed mauris. Cras ornare ultrices interdum. Nam et mi auctor, laoreet nibh sed, dictum leo. Quisque quis justo sed justo tempor viverra at at magna. Curabitur facilisis nisi quis dapibus euismod.',
        productDesc: 'Nullam nunc quam, lacinia non velit id, dapibus lacinia felis. Praesent ut enim dui. Quisque sapien justo, lacinia ut finibus quis, auctor eget ipsum. Morbi dui lacus, efficitur sollicitudin imperdiet vitae, laoreet id urna. Phasellus urna quam, vehicula vel pulvinar nec, vestibulum at urna. Mauris in laoreet tellus.',
        dateOfRating: '2017-10-15'
      },
      {
        userId: 2345293847123413,
        rating: {
          overallRating: 4.5,
          recommendRating: 3,
          politenessRating: 5,
          helpfulnessRating: 4,
          trustworthyRating: 3
        },
        liked: 'Duis lobortis luctus iaculis. Fusce quis lorem aliquam, luctus sem a, eleifend quam. Curabitur at accumsan turpis. Suspendisse nec elementum eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla convallis rhoncus velit, ultrices aliquet tortor rutrum vel. Ut faucibus in nibh sed molestie. Donec finibus elit vitae nisi ornare convallis.',
        disliked: 'Curabitur auctor risus in neque venenatis tristique. Proin dictum, purus et vulputate finibus, nibh ex pellentesque tortor, vel maximus justo libero sed mauris. Cras ornare ultrices interdum. Nam et mi auctor, laoreet nibh sed, dictum leo. Quisque quis justo sed justo tempor viverra at at magna. Curabitur facilisis nisi quis dapibus euismod.',
        productDesc: 'Nullam nunc quam, lacinia non velit id, dapibus lacinia felis. Praesent ut enim dui. Quisque sapien justo, lacinia ut finibus quis, auctor eget ipsum. Morbi dui lacus, efficitur sollicitudin imperdiet vitae, laoreet id urna. Phasellus urna quam, vehicula vel pulvinar nec, vestibulum at urna. Mauris in laoreet tellus.',
        dateOfRating: '2017-10-10'
      },
    ]
  }

}
