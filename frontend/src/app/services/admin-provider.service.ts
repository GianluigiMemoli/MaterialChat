import { Injectable } from '@angular/core';
import {Admin} from '../admin';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {baseUrl, GET_ALL_ADMINS} from '../globals/endpoints';
import {LoadingOverlayServiceService} from './loading-overlay-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProviderService {
  public admins: Admin[] = [];
  public adminChanges: Subject<Admin[]> = new Subject<Admin[]>();
  constructor(private http: HttpClient, private loadingOverlayService: LoadingOverlayServiceService) {
    this.adminChanges.subscribe(admins => this.admins = admins);
    this.getAllAdmins();
    addEventListener('updateAdmins', () => this.getAllAdmins());
  }

  private getAllAdmins(): void{
    this.loadingOverlayService.setIsWaiting(true);
    this.http.get<Admin[]>(baseUrl + GET_ALL_ADMINS).subscribe(admins => {
      this.adminChanges.next(admins);
      this.loadingOverlayService.setIsWaiting(false);
    }, err => this.loadingOverlayService.setIsWaiting(false));
  }
}
