import { Injectable } from '@angular/core';
import {AdminLoginService} from './admin-login.service';
import {Observable} from 'rxjs';
import {LoadingOverlayServiceService} from './loading-overlay-service.service';
import {Router} from '@angular/router';
import {Admin} from '../admin';



@Injectable({
  providedIn: 'root'
})
export class LoggedAdminService {
  currentLoggedAdmin: Admin;

  constructor(private adminLoginService: AdminLoginService, private loadingService: LoadingOverlayServiceService, private router: Router ) { }

  public login(username: string, password: string): void {
        this.adminLoginService.login(username, password).subscribe(token => {
          localStorage.setItem('jwt_token', token);
          this.adminLoginService.getCurrentAdmin().subscribe(admin => {
            console.log('questo admin è');
            console.log(admin);
            this.currentLoggedAdmin = admin;
            this.loadingService.setIsWaiting(false);

          });
          this.router.navigate(['admin']);
        }, err => {
          this.loadingService.setIsWaiting(false);
          this.logout();
          throw err;
          });
  }



  private logout(): void {
    localStorage.removeItem('token');
  }

}

