import { TestBed } from '@angular/core/testing';

import { Create3dPlanetsService } from './create3d-planets.service';

describe('Create3dPlanetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Create3dPlanetsService = TestBed.get(Create3dPlanetsService);
    expect(service).toBeTruthy();
  });
});
