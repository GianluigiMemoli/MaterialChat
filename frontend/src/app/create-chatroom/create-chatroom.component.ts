import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ChatroomService} from '../services/chatroom.service';
import {ChatroomManagerService} from '../services/chatroom-manager.service';
import {LoadingOverlayServiceService} from '../services/loading-overlay-service.service';
import {LoggedAdminService} from '../services/logged-admin.service';
import {UserProviderService} from '../services/user-provider.service';

@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.component.html',
  styleUrls: ['./create-chatroom.component.css']
})
export class CreateChatroomComponent implements OnInit {
  private = false;
  chatroomName: FormControl;
  isWaiting: boolean;
  constructor(private chatroomManager: ChatroomManagerService,
              private loadingOverlayService: LoadingOverlayServiceService,
              private loggedUser: UserProviderService
  ) {
    this.loadingOverlayService.isWaitingChanged.subscribe(val => this.isWaiting = val);
    this.chatroomName = new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ]);
  }

  ngOnInit(): void {
  }

  toggle() {
    this.private = !this.private;
    console.log(this.private);
  }

  submit() {
    const adminId = this.loggedUser.currentUser.id;
    console.log(adminId);
    if (this.chatroomName.valid && adminId !== undefined){
      this.loadingOverlayService.setIsWaiting(true);
      this.chatroomManager.createChatroom(this.chatroomName.value, this.private, adminId);
      this.chatroomName.setValue('');
      this.private = false;
    }
  }
}
