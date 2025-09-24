import { TestBed } from '@angular/core/testing';

import { TipomovimientocxcService } from './tipomovimientocxc.service';

describe('TipomovimientocxcService', () => {
  let service: TipomovimientocxcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipomovimientocxcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
