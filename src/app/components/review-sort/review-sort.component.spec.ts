import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSortComponent } from './review-sort.component';

describe('ReviewSortComponent', () => {
  let component: ReviewSortComponent;
  let fixture: ComponentFixture<ReviewSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
