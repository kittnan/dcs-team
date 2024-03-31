import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpecialViewComponent } from './report-special-view.component';

describe('ReportSpecialViewComponent', () => {
  let component: ReportSpecialViewComponent;
  let fixture: ComponentFixture<ReportSpecialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSpecialViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSpecialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
