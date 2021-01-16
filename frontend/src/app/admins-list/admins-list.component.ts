import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit {
  searchedAdmin = new FormControl();
  showingAdmins: any;

  constructor() { }

  ngOnInit(): void {
  }

}
