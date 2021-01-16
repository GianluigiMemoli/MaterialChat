import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ChatRoom} from '../chat-room';
import {HttpClient} from '@angular/common/http';
import {baseUrl, GET_ALL_CHATROOMS} from '../globals/endpoints';
import {PushEventsService} from './push-events.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomProviderService {

   public chatRoomsChange: Subject<ChatRoom[]>;
   private registeredChatroomIds: Set<number> = new Set<number>();
   private chatrooms: ChatRoom[] = [];
  constructor(private http: HttpClient, private pushEvents: PushEventsService, private snackBar: MatSnackBar, private router: Router) {
    this.chatRoomsChange = new Subject<ChatRoom[]>();
    this.pushEvents.subscribeToChannel('chatroom','ChatroomCreated', (event) => {
      this.fetchChatrooms();
    });
  }


  public fetchChatrooms(): void{
    this.http.get<ChatRoom[]>(baseUrl + GET_ALL_CHATROOMS).subscribe(
      data => {
        this.chatRoomsChange.next(data);
        this.chatrooms = data;
        this._registerNewChatrooms(data);
      }
    );
  }

  private _registerNewChatrooms(rooms: ChatRoom[]): void {
    const newRooms = rooms.filter(room => !this.registeredChatroomIds.has(room.id));
    newRooms.forEach(room => {
      this._registerToChatroomChannel(room.id + '');
      this.registeredChatroomIds.add(room.id);
    });
  }

  public getChatroomById(id: number): ChatRoom{
    const chatRoom = this.chatrooms.filter(room => room.id == id).pop();
    return chatRoom;
  }

  private _registerToChatroomChannel(chatroomId: string){
    this.pushEvents.subscribeToChannel(`newMessageOn.${chatroomId}`, 'NewPublicChatroomMessage', (event) => {
      const msg = event.message;
      dispatchEvent(new CustomEvent('newMessage', {detail: event.message}));

    });
  }
}
