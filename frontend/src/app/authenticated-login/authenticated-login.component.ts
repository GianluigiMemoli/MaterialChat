import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminLoginService} from '../services/admin-login.service';
import {LoggedAdminService} from '../services/logged-admin.service';
import {LoadingOverlayServiceService} from '../services/loading-overlay-service.service';
@Component({
  selector: 'app-authenticated-login',
  templateUrl: './authenticated-login.component.html',
  styleUrls: ['./authenticated-login.component.css']
})
export class AuthenticatedLoginComponent implements OnInit {
  hide: boolean;
  isWaiting: boolean;
  username: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(private loggedAdminService: LoggedAdminService, private loadingOverlayService: LoadingOverlayServiceService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(64),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')
      ])
    });

    this.loadingOverlayService.isWaitingChanged.subscribe(isWaiting => {
      console.log('cambiato is wait: ' + isWaiting);
      this.isWaiting = isWaiting;
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      this.loadingOverlayService.setIsWaiting(true);
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      this.loggedAdminService.login(username, password);
    }
  }
}
