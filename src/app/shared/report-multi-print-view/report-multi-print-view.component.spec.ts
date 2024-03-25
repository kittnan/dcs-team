import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMultiPrintViewComponent } from './report-multi-print-view.component';

describe('ReportMultiPrintViewComponent', () => {
  let component: ReportMultiPrintViewComponent;
  let fixture: ComponentFixture<ReportMultiPrintViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMultiPrintViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportMultiPrintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
