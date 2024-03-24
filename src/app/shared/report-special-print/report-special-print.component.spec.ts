import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpecialPrintComponent } from './report-special-print.component';

describe('ReportSpecialPrintComponent', () => {
  let component: ReportSpecialPrintComponent;
  let fixture: ComponentFixture<ReportSpecialPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSpecialPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSpecialPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
