import { TestBed } from '@angular/core/testing';

import { AdminProviderService } from './admin-provider.service';

describe('AdminProviderService', () => {
  let service: AdminProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
