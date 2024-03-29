import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialReportViewComponent } from './special-report-view.component';

describe('SpecialReportViewComponent', () => {
  let component: SpecialReportViewComponent;
  let fixture: ComponentFixture<SpecialReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
