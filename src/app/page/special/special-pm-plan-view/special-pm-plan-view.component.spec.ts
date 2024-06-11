import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPmPlanViewComponent } from './special-pm-plan-view.component';

describe('SpecialPmPlanViewComponent', () => {
  let component: SpecialPmPlanViewComponent;
  let fixture: ComponentFixture<SpecialPmPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPmPlanViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPmPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
