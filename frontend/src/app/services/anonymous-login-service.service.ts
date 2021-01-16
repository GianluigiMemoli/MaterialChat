import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user';
import {ANONYMOUS_LOGIN, baseUrl, ME} from '../globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AnonymousLoginServiceService {

  constructor(private http: HttpClient) { }

  public login(username: string): Observable<User> {
    console.log('2');
    localStorage.removeItem('jwt_token');
    console.log('3');
    const params = new HttpParams().append('username', username);
    console.log('4');
    return this.http.get<User>(baseUrl + ANONYMOUS_LOGIN, {params});
  }

  public me(): Observable<User> {
    return this.http.get<User>(baseUrl + ME);
  }
}
