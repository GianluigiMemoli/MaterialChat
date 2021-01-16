import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem('jwt_token');
    if (token){
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
