import { TestBed } from '@angular/core/testing';

import { CreateOne3dPlanetService } from './create-one-3d-planet.service';

describe('CreateOne3dPlanetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateOne3dPlanetService = TestBed.get(CreateOne3dPlanetService);
    expect(service).toBeTruthy();
  });
});
