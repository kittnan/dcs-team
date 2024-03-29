import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerPmReportNewComponent } from './engineer-pm-report-new.component';

describe('EngineerPmReportNewComponent', () => {
  let component: EngineerPmReportNewComponent;
  let fixture: ComponentFixture<EngineerPmReportNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerPmReportNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerPmReportNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
