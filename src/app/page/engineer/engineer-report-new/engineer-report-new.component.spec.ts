import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerReportNewComponent } from './engineer-report-new.component';

describe('EngineerReportNewComponent', () => {
  let component: EngineerReportNewComponent;
  let fixture: ComponentFixture<EngineerReportNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerReportNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerReportNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
