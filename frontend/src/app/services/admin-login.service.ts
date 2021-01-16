import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl, ADMIN_LOGIN_ENDPOINT, GET_CURRENT_ADMIN} from '../globals/endpoints.js';
import {Observable} from 'rxjs';
import {Admin} from '../admin';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<string>{
    return this.http.post<string>(baseUrl + ADMIN_LOGIN_ENDPOINT, {username, password});
  }

  public getCurrentAdmin(): Observable<Admin> {
    return this.http.get<Admin>(baseUrl + GET_CURRENT_ADMIN);
  }
}

