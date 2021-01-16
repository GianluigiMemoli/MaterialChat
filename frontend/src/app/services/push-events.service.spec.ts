import { TestBed } from '@angular/core/testing';

import { PushEventsService } from './push-events.service';

describe('PushEventsService', () => {
  let service: PushEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
