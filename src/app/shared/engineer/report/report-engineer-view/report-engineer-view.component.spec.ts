import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEngineerViewComponent } from './report-engineer-view.component';

describe('ReportEngineerViewComponent', () => {
  let component: ReportEngineerViewComponent;
  let fixture: ComponentFixture<ReportEngineerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEngineerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEngineerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
