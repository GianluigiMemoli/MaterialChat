import {Attachment} from './attachment';

export interface Message {
  text: string;
  chatroom_id: number;
  attachment: Attachment;
  sender_username: string;
  created_at: Date;
  updated_at: Date;
}
