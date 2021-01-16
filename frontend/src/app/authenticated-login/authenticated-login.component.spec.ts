import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedLoginComponent } from './authenticated-login.component';

describe('AuthenticatedLoginComponent', () => {
  let component: AuthenticatedLoginComponent;
  let fixture: ComponentFixture<AuthenticatedLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatedLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
