import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPmReportViewComponent } from './special-pm-report-view.component';

describe('SpecialPmReportViewComponent', () => {
  let component: SpecialPmReportViewComponent;
  let fixture: ComponentFixture<SpecialPmReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPmReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialPmReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
