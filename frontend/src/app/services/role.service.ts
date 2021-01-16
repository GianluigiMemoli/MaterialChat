import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../role';
import {baseUrl, GET_CURRENT_ROLE} from '../globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  public getCurrentRole(): Observable<Role> {
    return this.http.get<Role>(baseUrl + GET_CURRENT_ROLE);
  }
}
