import { TestBed } from '@angular/core/testing';

import { HttpPmPlanService } from './http-pm-plan.service';

describe('HttpPmPlanService', () => {
  let service: HttpPmPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPmPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
