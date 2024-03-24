import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialReportPrintComponent } from './special-report-print.component';

describe('SpecialReportPrintComponent', () => {
  let component: SpecialReportPrintComponent;
  let fixture: ComponentFixture<SpecialReportPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialReportPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
