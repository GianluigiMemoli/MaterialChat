import { Injectable } from '@angular/core';
import {
  ADD_PARTECIPANT,
  baseUrl,
  CREATE_CHATROOM,
  GET_CHATROOM_BY_SHAREBLE,
  GET_CHATROOM_MESSAGES, GET_CHATROOM_PARTECIPANTS,
  SEND_ADMIN_MESSAGE, SEND_MESSAGE
} from '../globals/endpoints';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChatRoom} from '../chat-room';
import {Message} from '../message';
import {Admin} from '../admin';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private http: HttpClient) { }

  public createChatroom(name: string, isPrivate: boolean): Observable<ChatRoom> {
    const params = new HttpParams()
      .append('name', name)
      .append('private', (isPrivate ? '1' : '0'));

    return this.http.get<ChatRoom>(baseUrl + CREATE_CHATROOM, {params});
  }

  public getChatroomByShareble(shareble: string): Observable<ChatRoom>{
    const params = new HttpParams()
      .append('shareble_link', shareble);
    return this.http.get<ChatRoom>(baseUrl + GET_CHATROOM_BY_SHAREBLE, {params});
  }

  public getChatroomMessages(chatroomId: string): Observable<Message[]>{
    const params = new HttpParams()
      .append('chatroom_id', chatroomId);
    return this.http.get<Message[]>(baseUrl + GET_CHATROOM_MESSAGES, {params});
  }

  public sendMessage(text: string, chatroom_id: number, attachmentFile ?: File): void{

    if (!attachmentFile) {
      console.log('mando senza');
      this.http.post(baseUrl + SEND_MESSAGE, {chatroom_id, text}).subscribe(() => {
      });
    } else {
      console.log('mando con');
      const body = new FormData();
      body.append('attachment', attachmentFile);
      body.append('text', text);
      body.append('chatroom_id', `${chatroom_id}`);
      this.http.post(baseUrl + SEND_MESSAGE, body).subscribe(() => {});
    }
  }

  public addPartecipant(chatroomId: number, partecipantId: string): Observable<boolean> {
    const params = new HttpParams()
      .append('chatroom_id', `${chatroomId}`)
      .append('partecipant_id', partecipantId);
    return this.http.get<boolean>(baseUrl + ADD_PARTECIPANT, {params});
  }

  public getPartecipants(chatroomId: number): Observable<Admin[]>{
    const params = new HttpParams()
      .append('chatroom_id', `${chatroomId}`);
    return this.http.get<Admin[]>(baseUrl + GET_CHATROOM_PARTECIPANTS,{params});
  }
}
