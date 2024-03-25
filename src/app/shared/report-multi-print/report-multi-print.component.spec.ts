import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMultiPrintComponent } from './report-multi-print.component';

describe('ReportMultiPrintComponent', () => {
  let component: ReportMultiPrintComponent;
  let fixture: ComponentFixture<ReportMultiPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMultiPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportMultiPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
