import { TestBed } from '@angular/core/testing';

import { MapPinsService } from './map-pins.service';

describe('MapPinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapPinsService = TestBed.get(MapPinsService);
    expect(service).toBeTruthy();
  });
});
