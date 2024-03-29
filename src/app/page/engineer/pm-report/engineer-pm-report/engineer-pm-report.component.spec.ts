import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerPmReportComponent } from './engineer-pm-report.component';

describe('EngineerPmReportComponent', () => {
  let component: EngineerPmReportComponent;
  let fixture: ComponentFixture<EngineerPmReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerPmReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerPmReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
