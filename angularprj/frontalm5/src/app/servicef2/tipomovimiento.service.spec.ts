import { TestBed } from '@angular/core/testing';

import { TipomovimientoService } from './tipomovimiento.service';

describe('TipomovimientoService', () => {
  let service: TipomovimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipomovimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
