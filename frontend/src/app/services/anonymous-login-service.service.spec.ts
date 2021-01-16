import { TestBed } from '@angular/core/testing';

import { AnonymousLoginServiceService } from './anonymous-login-service.service';

describe('AnonymousLoginServiceService', () => {
  let service: AnonymousLoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonymousLoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
