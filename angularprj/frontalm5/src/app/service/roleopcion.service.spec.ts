import { TestBed } from '@angular/core/testing';

import { RoleopcionService } from './roleopcion.service';

describe('RoleopcionService', () => {
  let service: RoleopcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleopcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
