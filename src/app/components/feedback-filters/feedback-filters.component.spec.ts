import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFiltersComponent } from './feedback-filters.component';

describe('FeedbackFiltersComponent', () => {
  let component: FeedbackFiltersComponent;
  let fixture: ComponentFixture<FeedbackFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
