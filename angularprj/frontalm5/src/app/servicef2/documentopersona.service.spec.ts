import { TestBed } from '@angular/core/testing';

import { DocumentopersonaService } from './documentopersona.service';

describe('DocumentopersonaService', () => {
  let service: DocumentopersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentopersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
