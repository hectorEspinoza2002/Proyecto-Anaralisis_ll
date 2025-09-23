import { TestBed } from '@angular/core/testing';

import { TiposaldocuentaService } from './tiposaldocuenta.service';

describe('TiposaldocuentaService', () => {
  let service: TiposaldocuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposaldocuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
