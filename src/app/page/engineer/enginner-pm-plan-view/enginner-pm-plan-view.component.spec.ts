import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginnerPmPlanViewComponent } from './enginner-pm-plan-view.component';

describe('EnginnerPmPlanViewComponent', () => {
  let component: EnginnerPmPlanViewComponent;
  let fixture: ComponentFixture<EnginnerPmPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnginnerPmPlanViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnginnerPmPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
