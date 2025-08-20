import { TestBed } from '@angular/core/testing';

import { StatusUsuarioService } from './status-usuario.service';

describe('StatusUsuarioService', () => {
  let service: StatusUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
