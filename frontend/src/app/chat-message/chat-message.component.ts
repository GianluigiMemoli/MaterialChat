import {Component, Input, OnInit} from '@angular/core';
import {Attachment} from '../attachment';
import {chatroomAttachments, chatroomRepo, repositoryUrl} from '../globals/endpoints';

interface Avatar {
}

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() username: string;
  @Input() avatar: Avatar;
  @Input() text: string;
  @Input() attachment: Attachment;
  @Input() chatroomId: number;
  constructor() { }

  ngOnInit(): void {
  }

  redirectToAttachment(){
   const win = window.open(`${repositoryUrl}${chatroomRepo}/${this.chatroomId}/${chatroomAttachments}/${this.attachment.id}`, '_blank');
  }
}
