import { TestBed } from '@angular/core/testing';

import { HttpReportSpecialService } from './http-report-special.service';

describe('HttpReportSpecialService', () => {
  let service: HttpReportSpecialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpReportSpecialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
