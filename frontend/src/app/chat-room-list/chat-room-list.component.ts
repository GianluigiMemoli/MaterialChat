import { Component, OnInit } from '@angular/core';
import {ChatRoomProviderService} from '../services/chat-room-provider.service';
import {Observable} from 'rxjs';
import {ChatRoom} from '../chat-room';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrls: ['./chat-room-list.component.css']
})
export class ChatRoomListComponent implements OnInit {

  chatrooms: ChatRoom[] = [];
  showingChatrooms: ChatRoom[] = [];
  searchedRoom: FormControl = new FormControl();

  constructor(private chatRoomProviderService: ChatRoomProviderService) { }

  ngOnInit(): void {
    this.chatRoomProviderService.chatRoomsChange.subscribe(
      rooms => {
        this.chatrooms = rooms;
        this.showingChatrooms = rooms;
      }
    );
    this.chatRoomProviderService.fetchChatrooms();
    this.searchedRoom.valueChanges.subscribe(value => this._filter(value));
  }

  private _filter(val: string): void {
    this.showingChatrooms = this.chatrooms.filter(chatRoom => {
      const textLength = val.length;
      return (chatRoom.name.substr(0, textLength) === val);
    });
  }
}
