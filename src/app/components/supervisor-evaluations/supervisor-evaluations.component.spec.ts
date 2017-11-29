import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorEvaluationsComponent } from './supervisor-evaluations.component';

describe('SupervisorEvaluationsComponent', () => {
  let component: SupervisorEvaluationsComponent;
  let fixture: ComponentFixture<SupervisorEvaluationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorEvaluationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorEvaluationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
