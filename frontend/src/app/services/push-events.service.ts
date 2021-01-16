import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import {baseUrl} from '../globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PushEventsService {
  private Echo: Echo;

  constructor() {
    const pusher = new Pusher('18bf90564e6adc8ec3e0');
    this.Echo = new Echo({
      authEndpoint: `${baseUrl}/broadcasting/auth`,
      broadcaster: 'pusher',
      key: '18bf90564e6adc8ec3e0',
      cluster: 'eu',
      encrypted: true,
      auth: {headers: {Authorization: 'Bearer ' + localStorage.getItem('jwt_token')}}
    });
  }

  subscribeToChannel(channelName: string, eventName: string, callback): void{
    const channel = `${channelName}`;
    console.log(channel);
    this.Echo.private(channel)
      .listen(eventName, (e) => {
        callback(e);
      });
  }

  public getSocketId(): string {
    return this.Echo.socketId();
  }
}
