import { TestBed } from '@angular/core/testing';

import { HttpServiceTypeService } from './http-serviceType.service';

describe('HttpUsersService', () => {
  let service: HttpServiceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpServiceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
