import { TestBed } from '@angular/core/testing';

import { ActoresServiciosService } from './actores-servicios.service';

describe('ActoresServiciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActoresServiciosService = TestBed.get(ActoresServiciosService);
    expect(service).toBeTruthy();
  });
});
