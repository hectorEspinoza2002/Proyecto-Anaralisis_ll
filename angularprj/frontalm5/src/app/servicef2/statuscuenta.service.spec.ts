import { TestBed } from '@angular/core/testing';

import { StatuscuentaService } from './statuscuenta.service';

describe('StatuscuentaService', () => {
  let service: StatuscuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatuscuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
