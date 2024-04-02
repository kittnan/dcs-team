import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReportPmComponent } from './table-report-pm.component';

describe('TableReportPmComponent', () => {
  let component: TableReportPmComponent;
  let fixture: ComponentFixture<TableReportPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableReportPmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableReportPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
