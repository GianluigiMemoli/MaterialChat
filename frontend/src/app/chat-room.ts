export interface ChatRoom {
  id: number;
  private: boolean;
  name: string;
  created_at: Date;
  updated_at: Date;
  shareble_link: string;
  creator: string;
}
