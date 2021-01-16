import { Injectable } from '@angular/core';
import {AnonymousLoginServiceService} from './anonymous-login-service.service';
import {Subject} from 'rxjs';
import {User} from '../user';
import {LoadingOverlayServiceService} from './loading-overlay-service.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {
  public currentUser: User;
  public userChanges: Subject<User> = new Subject<User>();

  constructor(private loginService: AnonymousLoginServiceService,
              private loadingService: LoadingOverlayServiceService,
              private authService: AuthenticationService,
              private router: Router) {
    if (this.authService.isAuthenticated()){
      console.log('authenticated');
      this.loginService.me().subscribe(usr => {
        this.currentUser = usr;
        this.userChanges.next(usr);
        console.log(usr);
      });
    } else {
      console.log('not auth');
    }
  }

  public login(username: string): void{
    console.log('1');
    this.loadingService.setIsWaiting(true);
    this.loginService.login(username).subscribe(user => {
      this.userChanges.next(user);
      this.currentUser = user;
      console.log('user setted');
      console.log(user);
      this.loadingService.setIsWaiting(false);
      localStorage.setItem('jwt_token', user.token);
      this.router.navigate(['home']);
    },
      error => {
        this.loadingService.setIsWaiting(false);
        throw error;
      });
  }
}

