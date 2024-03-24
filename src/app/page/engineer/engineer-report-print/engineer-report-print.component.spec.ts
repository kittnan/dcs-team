import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerReportPrintComponent } from './engineer-report-print.component';

describe('EngineerReportPrintComponent', () => {
  let component: EngineerReportPrintComponent;
  let fixture: ComponentFixture<EngineerReportPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerReportPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
