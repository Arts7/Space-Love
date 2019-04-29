import { TestBed } from '@angular/core/testing';

import { PersonProfilesService } from './person-profiles.service';

describe('PersonProfilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonProfilesService = TestBed.get(PersonProfilesService);
    expect(service).toBeTruthy();
  });
});
