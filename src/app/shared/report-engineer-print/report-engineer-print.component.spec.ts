import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEngineerPrintComponent } from './report-engineer-print.component';

describe('ReportEngineerPrintComponent', () => {
  let component: ReportEngineerPrintComponent;
  let fixture: ComponentFixture<ReportEngineerPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEngineerPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEngineerPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
