import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialReportNewComponent } from './special-report-new.component';

describe('SpecialReportNewComponent', () => {
  let component: SpecialReportNewComponent;
  let fixture: ComponentFixture<SpecialReportNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialReportNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialReportNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
