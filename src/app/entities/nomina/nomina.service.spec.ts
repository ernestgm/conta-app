import { TestBed, inject } from '@angular/core/testing';

import { NominaService } from './nomina.service';

describe('NominanaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NominaService]
    });
  });

  it('should be created', inject([NominaService], (service: NominaService) => {
    expect(service).toBeTruthy();
  }));
});
