import { TestBed } from '@angular/core/testing';

import { MovimientocuentaService } from './movimientocuenta.service';

describe('MovimientocuentaService', () => {
  let service: MovimientocuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientocuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
