import { Component, OnInit } from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {MediaObserver} from '@angular/flex-layout';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
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
