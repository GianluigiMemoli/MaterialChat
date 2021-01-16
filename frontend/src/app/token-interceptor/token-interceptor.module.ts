import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TokenInterceptorModule implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticateUser(req, next);
  }

  private authenticateUser(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('5');
    const token = localStorage.getItem('jwt_token');
    if (token !== undefined){
      let authenticatedRequest = request;
      const headerSettings: {[name: string]: string | string[]; } = {};
      for (const key of request.headers.keys()) {
        headerSettings[key] = request.headers.getAll(key);
      }
      headerSettings.Authorization = 'Bearer ' + token;
      //headerSettings['Content-Type'] = 'application/json';
      const newHeader = new HttpHeaders(headerSettings);
      authenticatedRequest = request.clone({
        headers: newHeader
      });

      return next.handle(authenticatedRequest);
    }
  }
}
