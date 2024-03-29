import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPmReportNewComponent } from './special-pm-report-new.component';

describe('SpecialPmReportNewComponent', () => {
  let component: SpecialPmReportNewComponent;
  let fixture: ComponentFixture<SpecialPmReportNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPmReportNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPmReportNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
