import { TestBed } from '@angular/core/testing';

import { SaldocuentahistService } from './saldocuentahist.service';

describe('SaldocuentahistService', () => {
  let service: SaldocuentahistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaldocuentahistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
