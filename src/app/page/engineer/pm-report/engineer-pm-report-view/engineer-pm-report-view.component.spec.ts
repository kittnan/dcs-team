import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerPmReportViewComponent } from './engineer-pm-report-view.component';

describe('EngineerPmReportViewComponent', () => {
  let component: EngineerPmReportViewComponent;
  let fixture: ComponentFixture<EngineerPmReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerPmReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerPmReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
