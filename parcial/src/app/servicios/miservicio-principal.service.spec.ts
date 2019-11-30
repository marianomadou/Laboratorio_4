import { TestBed } from '@angular/core/testing';

import { MiservicioPrincipalService } from './miservicio-principal.service';

describe('MiservicioPrincipalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiservicioPrincipalService = TestBed.get(MiservicioPrincipalService);
    expect(service).toBeTruthy();
  });
});
