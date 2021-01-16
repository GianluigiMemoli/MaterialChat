import { Component, OnInit } from '@angular/core';
import {UserProviderService} from '../services/user-provider.service';
import {User} from '../user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  currentUser: User;

  constructor(private userProviderService: UserProviderService) {

  }

  ngOnInit(): void {
    this.userProviderService.userChanges.subscribe(usr => {
      console.log('stica');
      this.currentUser = usr;
    });
    if(this.userProviderService.currentUser){
      this.currentUser = this.userProviderService.currentUser;
    }
  }

}
