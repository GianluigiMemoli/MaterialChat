import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatListItem} from '@angular/material/list';
import {ChatroomService} from '../services/chatroom.service';
import {ChatRoom} from '../chat-room';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {LoadingOverlayServiceService} from '../services/loading-overlay-service.service';
import {Message} from '../message';
import {NotificationService} from '../services/notification.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddPartecipantsComponent} from '../add-partecipants/add-partecipants.component';
import {Admin} from '../admin';
import {$e} from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'app-view-chatroom',
  templateUrl: './view-chatroom.component.html',
  styleUrls: ['./view-chatroom.component.css']
})
export class ViewChatroomComponent implements OnInit, OnDestroy {
  sharebleLink: string;
  messages: Message[];
  selectedChatroom: ChatRoom;
  isWaiting = false;
  messageText: FormControl = new FormControl();
  fileUploaded: File;
  chatroomPartecipants: Admin[] = [];
  constructor(private route: ActivatedRoute,
              private chatroomService: ChatroomService,
              private loadingOverlayService: LoadingOverlayServiceService,
              private notificationService: NotificationService,
              private dialog: MatDialog)
  {
    this.messageText = new FormControl('', [Validators.required]);
  }

  ngOnInit(): void {
    this.loadingOverlayService.isWaitingChanged.subscribe(value => this.isWaiting = value);
    this.loadingOverlayService.setIsWaiting(true);

    this.route.params.subscribe(
      params => {
        this.sharebleLink = params.shareble_link;
        addEventListener(`newMessage-${this.sharebleLink}`, this._pushIncomingMessage.bind(this));
        this.notificationService.currentSharebleChange.next(this.sharebleLink);
        this.chatroomService.getChatroomByShareble(this.sharebleLink)
          .subscribe(room => {
            this.selectedChatroom = room;
            if(this.selectedChatroom.private){
              this._getPartecipants();
            }
            this.chatroomService.getChatroomMessages(this.selectedChatroom.id + '')
              .subscribe(messages => {
                this.messages = messages;
                this.loadingOverlayService.setIsWaiting(false);
              });
          });
      }
    );
    addEventListener('updatePartecipants', this._getPartecipants.bind(this));
  }

  ngOnDestroy() {
    this.notificationService.currentSharebleChange.next('');
  }

  private _pushIncomingMessage(event): void {
    console.log('should push');
    const message = (event as CustomEvent).detail;
    this.messages.push(message);
    console.log(this.messages);
  }

  public onSend(){
    if (this.messageText.valid || this.fileUploaded){
        if(!this.fileUploaded) {
            this.chatroomService.sendMessage(this.messageText.value, this.selectedChatroom.id);
            this.messageText.setValue('');
        } else {
            this.chatroomService.sendMessage(this.messageText.value, this.selectedChatroom.id, this.fileUploaded);
            this.messageText.setValue('');
            this.fileUploaded = undefined;
        }
    }
  }

  openDialog() {
    this.dialog.open(AddPartecipantsComponent, {
        width: '250px',
        data: {id: this.selectedChatroom.id, partecipants: this.chatroomPartecipants}
      }
    );
  }

  _getPartecipants(): void {
    this.chatroomService.getPartecipants(this.selectedChatroom.id).subscribe(partecipants => this.chatroomPartecipants = partecipants);
  }

    uploadFile($event: any): void {
      this.fileUploaded = $event.target.files.item(0);
      console.log($event.target.files);
      $event.target.files = null;
    }
}
