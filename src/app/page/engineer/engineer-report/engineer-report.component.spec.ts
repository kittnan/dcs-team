import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerReportComponent } from './engineer-report.component';

describe('EngineerReportComponent', () => {
  let component: EngineerReportComponent;
  let fixture: ComponentFixture<EngineerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
