import { TestBed } from '@angular/core/testing';

import { SaldocuentaService } from './saldocuenta.service';

describe('SaldocuentaService', () => {
  let service: SaldocuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaldocuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
