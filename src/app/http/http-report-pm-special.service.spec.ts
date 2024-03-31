import { TestBed } from '@angular/core/testing';

import { HttpReportPmSpecialService } from './http-report-pm-special.service';

describe('HttpReportPmSpecialService', () => {
  let service: HttpReportPmSpecialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpReportPmSpecialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
