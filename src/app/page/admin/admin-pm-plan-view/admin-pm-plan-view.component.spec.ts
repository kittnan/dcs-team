import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPmPlanViewComponent } from './admin-pm-plan-view.component';

describe('AdminPmPlanViewComponent', () => {
  let component: AdminPmPlanViewComponent;
  let fixture: ComponentFixture<AdminPmPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPmPlanViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPmPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
