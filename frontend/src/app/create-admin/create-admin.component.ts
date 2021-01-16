import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminRegistrationService} from '../services/admin-registration.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  username: FormControl;
  password: FormControl;
  email: FormControl;
  createAdminForm: FormGroup;
  hidePwd = true;

  constructor(private adminRegistrationServive: AdminRegistrationService) {
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]);
    this.password = new FormControl('',[
      Validators.required,
      Validators.maxLength(64),
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')
    ]);
    this.email = new FormControl('',[
      Validators.required,
      Validators.email
    ]);
    this.createAdminForm = new FormGroup({
      username: this.username,
      password: this.password,
      email: this.email
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.createAdminForm.valid){
      const username = this.username.value;
      const password = this.password.value;
      const email = this.email.value;
      this.adminRegistrationServive.registerAdmin(username, email, password);
    }


  }
}
