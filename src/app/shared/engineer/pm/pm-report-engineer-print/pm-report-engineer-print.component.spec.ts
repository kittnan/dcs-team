import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmReportEngineerPrintComponent } from './pm-report-engineer-print.component';

describe('PmReportEngineerPrintComponent', () => {
  let component: PmReportEngineerPrintComponent;
  let fixture: ComponentFixture<PmReportEngineerPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmReportEngineerPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmReportEngineerPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
