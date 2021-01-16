import { TestBed } from '@angular/core/testing';

import { LoggedAdminService } from './logged-admin.service';

describe('LoggedAdminService', () => {
  let service: LoggedAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
