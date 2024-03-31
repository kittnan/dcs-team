import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmReportSpecialViewComponent } from './pm-report-special-view.component';

describe('PmReportSpecialViewComponent', () => {
  let component: PmReportSpecialViewComponent;
  let fixture: ComponentFixture<PmReportSpecialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmReportSpecialViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmReportSpecialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
