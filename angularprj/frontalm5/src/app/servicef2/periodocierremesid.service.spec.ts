import { TestBed } from '@angular/core/testing';

import { PeriodocierremesidService } from './periodocierremesid.service';

describe('PeriodocierremesidService', () => {
  let service: PeriodocierremesidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodocierremesidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
