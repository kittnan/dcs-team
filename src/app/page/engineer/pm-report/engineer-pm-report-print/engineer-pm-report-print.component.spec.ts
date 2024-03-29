import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerPmReportPrintComponent } from './engineer-pm-report-print.component';

describe('EngineerPmReportPrintComponent', () => {
  let component: EngineerPmReportPrintComponent;
  let fixture: ComponentFixture<EngineerPmReportPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerPmReportPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerPmReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
