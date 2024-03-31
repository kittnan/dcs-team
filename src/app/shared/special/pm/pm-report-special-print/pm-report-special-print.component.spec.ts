import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmReportSpecialPrintComponent } from './pm-report-special-print.component';

describe('PmReportSpecialPrintComponent', () => {
  let component: PmReportSpecialPrintComponent;
  let fixture: ComponentFixture<PmReportSpecialPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmReportSpecialPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmReportSpecialPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
