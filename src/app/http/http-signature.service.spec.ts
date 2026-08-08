import { TestBed } from '@angular/core/testing';

import { HttpSignatureService } from './http-signature.service';

describe('HttpSignatureService', () => {
  let service: HttpSignatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
