import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartecipantsComponent } from './add-partecipants.component';

describe('AddPartecipantsComponent', () => {
  let component: AddPartecipantsComponent;
  let fixture: ComponentFixture<AddPartecipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartecipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartecipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
