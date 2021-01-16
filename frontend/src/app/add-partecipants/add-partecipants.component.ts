import {Component, Inject, OnInit} from '@angular/core';
import {LoadingOverlayServiceService} from '../services/loading-overlay-service.service';
import {AdminProviderService} from '../services/admin-provider.service';
import {Admin} from '../admin';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChatroomService} from '../services/chatroom.service';

@Component({
  selector: 'app-add-partecipants',
  templateUrl: './add-partecipants.component.html',
  styleUrls: ['./add-partecipants.component.css']
})
export class AddPartecipantsComponent implements OnInit {
  admins: Admin[] = [];
  isWaiting = false;
  selections: FormControl;
  selectedPartecipants: Admin[];
  alreadyExistingPartecipants: Set<string> = new Set<string>();
  chatroomId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loadingOverlayService: LoadingOverlayServiceService,
    private adminProviderService: AdminProviderService,
    private chatroomService: ChatroomService
  ) {
    this.loadingOverlayService.isWaitingChanged.subscribe(val => this.isWaiting = val);

    this.chatroomId = data.id;
    this.alreadyExistingPartecipants = new Set<string>(data.partecipants.map(partecipant => partecipant.id));
    console.log(this.alreadyExistingPartecipants);
    if (adminProviderService.admins.length > 0){
      this._filterAdmins(this.adminProviderService.admins);
    }
    this.adminProviderService.adminChanges.subscribe(admins => this._filterAdmins(this.adminProviderService.admins));
    this.selections = new FormControl();
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.chatroomId && this.selectedPartecipants.length > 0) {
        this.selectedPartecipants.forEach(admin => {
          this.chatroomService.addPartecipant(this.chatroomId, admin.id)
            .subscribe(() => {dispatchEvent(new Event('updatePartecipants'))});
        });
    }
  }

  private _filterAdmins(admins: Admin[]): void{
    this.admins = admins.filter(admin => !this.alreadyExistingPartecipants.has(admin.id));
  }
}
