import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmReportEngineerViewComponent } from './pm-report-engineer-view.component';

describe('PmReportEngineerViewComponent', () => {
  let component: PmReportEngineerViewComponent;
  let fixture: ComponentFixture<PmReportEngineerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmReportEngineerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmReportEngineerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
