import { TestBed } from '@angular/core/testing';

import { HttpReportPmService } from './http-report-pm.service';

describe('HttpReportPmService', () => {
  let service: HttpReportPmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpReportPmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
