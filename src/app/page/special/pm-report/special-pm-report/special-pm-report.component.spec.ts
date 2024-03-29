import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPmReportComponent } from './special-pm-report.component';

describe('SpecialPmReportComponent', () => {
  let component: SpecialPmReportComponent;
  let fixture: ComponentFixture<SpecialPmReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPmReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPmReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
