import {NgModule, NgZone} from '@angular/core';
import { CommonModule } from '@angular/common';

import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {hasOwnProperty} from 'tslint/lib/utils';
import {MatSnackBar} from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})


export class HttpErrorHandler extends ErrorHandler {
  constructor(private snackBar: MatSnackBar) {
    super();
  }

  handleError(error: Error): void {
    if (error instanceof HttpErrorResponse) {
      console.log('istanza di httperr');
      const errorResponse: HttpErrorResponse = error;

      switch (error.status) {
        /*case 401:
          this.zone.run(() => this.router.navigate(['']));
          break;
          */
        case 429:
          break;
        case 422:
          for (const field in errorResponse.error){
            this.snackBar.open(errorResponse.error[field], '', {duration: 1000 * 2});
          }
          break;

        default:
          let messages;
          if ('errors' in errorResponse.error){
            messages = errorResponse.error.errors;
          } else if ('error' in errorResponse.error){
            messages = errorResponse.error;
          }
          for (const field in messages){
            console.log('ciacling');
            this.snackBar.open(messages[field], '', {duration: 1000*2});
            throw error;
          }
          break;
      }
    }else {
      throw error;
    }
  }



}



