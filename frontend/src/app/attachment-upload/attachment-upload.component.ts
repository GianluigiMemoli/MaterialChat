import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.css']
})
export class AttachmentUploadComponent implements OnInit {
  @Input() attachment: File;
  @Output() uploadCanceled = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    this.uploadCanceled.emit();
  }
}
