import { Component, OnInit } from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  isMobile: boolean;
  isOpen: boolean;

  constructor(private mediaObserver: MediaObserver, private notificationService: NotificationService) {
    this.isMobile = this.mediaObserver.isActive('lt-md');
    if(this.isMobile){
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  ngOnInit(): void {
  }

}
