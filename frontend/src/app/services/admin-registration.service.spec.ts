import { TestBed } from '@angular/core/testing';

import { AdminRegistrationService } from './admin-registration.service';

describe('AdminRegistrationService', () => {
  let service: AdminRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
