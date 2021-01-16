import { TestBed } from '@angular/core/testing';

import { ChatRoomProviderService } from './chat-room-provider.service';

describe('ChatRoomProviderService', () => {
  let service: ChatRoomProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatRoomProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
