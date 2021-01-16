import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
