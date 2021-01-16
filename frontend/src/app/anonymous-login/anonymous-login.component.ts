import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators} from '@angular/forms';
import {UserProviderService} from '../services/user-provider.service';
@Component({
  selector: 'app-anonymous-login',
  templateUrl: './anonymous-login.component.html',
  styleUrls: ['./anonymous-login.component.css']
})
export class AnonymousLoginComponent implements OnInit {
  username: FormControl;

  constructor(private userProvider: UserProviderService) {
    this.username = new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(3)
    ]);
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.username.valid){
      this.userProvider.login(this.username.value);
    }
  }
}
