import { TestBed } from '@angular/core/testing';

import { PeriodocierremesService } from './periodocierremes.service';

describe('PeriodocierremesService', () => {
  let service: PeriodocierremesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodocierremesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
