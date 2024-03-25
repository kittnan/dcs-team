import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerReportMultiPrintViewComponent } from './engineer-report-multi-print-view.component';

describe('EngineerReportMultiPrintViewComponent', () => {
  let component: EngineerReportMultiPrintViewComponent;
  let fixture: ComponentFixture<EngineerReportMultiPrintViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerReportMultiPrintViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerReportMultiPrintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
