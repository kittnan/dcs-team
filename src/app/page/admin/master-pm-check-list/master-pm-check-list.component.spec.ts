import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPmCheckListComponent } from './master-pm-check-list.component';

describe('MasterPmCheckListComponent', () => {
  let component: MasterPmCheckListComponent;
  let fixture: ComponentFixture<MasterPmCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPmCheckListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPmCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
