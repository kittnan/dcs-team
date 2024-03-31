import { TestBed } from '@angular/core/testing';

import { HttpPMService } from './http-pm.service';

describe('HttpPMService', () => {
  let service: HttpPMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
