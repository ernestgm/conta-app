import { TestBed, inject } from '@angular/core/testing';

import { FabricasService } from './fabricas.service';

describe('FabricasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FabricasService]
    });
  });

  it('should be created', inject([FabricasService], (service: FabricasService) => {
    expect(service).toBeTruthy();
  }));
});
