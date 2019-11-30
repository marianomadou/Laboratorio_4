import { TestBed } from '@angular/core/testing';

import { PeliculasServicioService } from './peliculas-servicio.service';

describe('PeliculasServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeliculasServicioService = TestBed.get(PeliculasServicioService);
    expect(service).toBeTruthy();
  });
});
