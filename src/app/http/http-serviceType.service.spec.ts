import { TestBed } from '@angular/core/testing';

import { HttpUsersService } from './http-serviceType.service';

describe('HttpUsersService', () => {
  let service: HttpUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
