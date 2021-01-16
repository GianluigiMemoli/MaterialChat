import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChatroomComponent } from './view-chatroom.component';

describe('ViewChatroomComponent', () => {
  let component: ViewChatroomComponent;
  let fixture: ComponentFixture<ViewChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChatroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
