import { TestBed } from '@angular/core/testing';

import { CarouselProfileService } from './carousel-profile.service';

describe('CarouselProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarouselProfileService = TestBed.get(CarouselProfileService);
    expect(service).toBeTruthy();
  });
});
