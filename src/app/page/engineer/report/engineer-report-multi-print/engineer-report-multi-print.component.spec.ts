import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerReportMultiPrintComponent } from './engineer-report-multi-print.component';

describe('EngineerReportMultiPrintComponent', () => {
  let component: EngineerReportMultiPrintComponent;
  let fixture: ComponentFixture<EngineerReportMultiPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerReportMultiPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerReportMultiPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
