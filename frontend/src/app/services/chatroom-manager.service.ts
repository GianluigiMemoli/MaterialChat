import { Injectable } from '@angular/core';
import {ChatroomService} from './chatroom.service';
import {LoadingOverlayServiceService} from './loading-overlay-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChatroomManagerService {

  constructor(private chatroomService: ChatroomService, private loadingOverlayServiceService: LoadingOverlayServiceService) { }

  public createChatroom(name: string, isPrivate: boolean, partecipantId: string): void {
    this.chatroomService.createChatroom(name, isPrivate).subscribe(
      room => {
        if(room.private){
          this.addPartecipant(room.id, partecipantId);
        }
        this.loadingOverlayServiceService.setIsWaiting(false);
      }, err => {
        this.loadingOverlayServiceService.setIsWaiting(false);
        throw err;
      }
    );
  }

  public addPartecipant(chatroomId: number, partecipantId: string) {
    this.chatroomService.addPartecipant(chatroomId, partecipantId)
      .subscribe(response => {});
  }
}

