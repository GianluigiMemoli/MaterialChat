import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ChatRoomProviderService} from './chat-room-provider.service';
import {Message} from '../message';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggedAdminService} from './logged-admin.service';
import {Subject} from 'rxjs';
import {EventManager} from '@angular/platform-browser';
import {RoleService} from './role.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public currentSharebleChange: Subject<string> = new Subject<string>();
  private currentShareble: string;
  private parentRedirectComponent: string;
  constructor(
    private router: Router,
    private chatRoomProviderService: ChatRoomProviderService,
    private snackBar: MatSnackBar,
    private loggedAdminService: LoggedAdminService,
    private eventManager: EventManager,
    private roleService: RoleService
  )
  {
    addEventListener('newMessage', this._manageEvent.bind(this));
    this.currentSharebleChange.subscribe(openRoomLink => this.currentShareble = openRoomLink);
    this.currentSharebleChange.next('');
    this.roleService.getCurrentRole().subscribe(role => {
      if (role.name === "Admin"){
        this.parentRedirectComponent = 'adminPanel';
      } else {
        this.parentRedirectComponent = 'home';
      }
    });
  }

  private _manageEvent(event): void {
    const message: Message = (event as CustomEvent).detail;
    if (!this._isChatWindowOpen(message)) {
      this._showSnackbar(`${message.sender_username}: ${message.text}`,
        'open',
        () => this.router.navigate(
        [
          this.parentRedirectComponent,
          'viewChatroom',
          this.chatRoomProviderService.getChatroomById(message.chatroom_id).shareble_link]));
    } else {
      console.log('more selective dispatch');
      dispatchEvent(new CustomEvent(`newMessage-${this.currentShareble}`, {detail: message}));
    }
  }

  private _showSnackbar(text: string, action: string, callback?: any): void {
    if (callback) {
      this.snackBar.open(text, action).onAction().subscribe(callback);
    } else {
      this.snackBar.open(text, action);
    }
  }





  private _isChatWindowOpen(message: Message): boolean{
    const shareble = this.chatRoomProviderService.getChatroomById(message.chatroom_id).shareble_link;
    return  this.currentShareble === shareble;
  }


}
