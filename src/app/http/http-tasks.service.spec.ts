import { TestBed } from '@angular/core/testing';

import { HttpTasksService } from './http-tasks.service';

describe('HttpTasksService', () => {
  let service: HttpTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
