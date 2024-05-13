import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmPlanViewComponent } from './pm-plan-view.component';

describe('PmPlanViewComponent', () => {
  let component: PmPlanViewComponent;
  let fixture: ComponentFixture<PmPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmPlanViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
