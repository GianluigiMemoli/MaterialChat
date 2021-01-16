import { TestBed } from '@angular/core/testing';

import { ChatroomManagerService } from './chatroom-manager.service';

describe('ChatroomManagerService', () => {
  let service: ChatroomManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatroomManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
