import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl, CREATE_ADMIN} from '../globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AdminRegistrationService {

  constructor(private http: HttpClient) { }

  public registerAdmin(username: string, email: string, password: string): void {
    this.http.post(baseUrl + CREATE_ADMIN, {username, password, email}).subscribe(() => {});
  }
}
