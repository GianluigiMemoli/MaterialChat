import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingOverlayServiceService {

  constructor() {
    this.isWaitingChanged.next(false);
  }

  public isWaitingChanged: Subject<boolean> = new Subject<boolean>();
  private isWaiting: boolean;
  public setIsWaiting(newValue: boolean): void {
    this.isWaiting = newValue;
    this.isWaitingChanged.next(this.isWaiting);
  }
}
