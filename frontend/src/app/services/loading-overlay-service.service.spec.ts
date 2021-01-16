import { TestBed } from '@angular/core/testing';

import { LoadingOverlayServiceService } from './loading-overlay-service.service';

describe('LoadingOverlayServiceService', () => {
  let service: LoadingOverlayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingOverlayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
