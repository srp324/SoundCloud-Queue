import { TestBed } from '@angular/core/testing';

import { SoundCloudService } from './soundcloud.service';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundCloudService = TestBed.get(SoundCloudService);
    expect(service).toBeTruthy();
  });
});
