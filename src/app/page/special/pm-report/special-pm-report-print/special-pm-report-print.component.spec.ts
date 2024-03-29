import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPmReportPrintComponent } from './special-pm-report-print.component';

describe('SpecialPmReportPrintComponent', () => {
  let component: SpecialPmReportPrintComponent;
  let fixture: ComponentFixture<SpecialPmReportPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPmReportPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPmReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
