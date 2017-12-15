import { TestBed, inject } from '@angular/core/testing';

import { TrackersService } from './trackers.service';

describe('TrackersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackersService]
    });
  });

  it('should be created', inject([TrackersService], (service: TrackersService) => {
    expect(service).toBeTruthy();
  }));
});
