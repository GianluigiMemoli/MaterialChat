import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthenticatedLoginComponent } from './authenticated-login/authenticated-login.component';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpErrorHandler } from './services/http-error-handler.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {TokenInterceptorModule} from './token-interceptor/token-interceptor.module';
import {JwtModule} from '@auth0/angular-jwt';
import {baseUrl} from './globals/endpoints';
import { CreateChatroomComponent } from './create-chatroom/create-chatroom.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ViewChatroomComponent } from './view-chatroom/view-chatroom.component';
import {MatRippleModule} from '@angular/material/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AddPartecipantsComponent } from './add-partecipants/add-partecipants.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AttachmentUploadComponent } from './attachment-upload/attachment-upload.component';

function tokenGetter(): string {
  return localStorage.getItem("jwt_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthenticatedLoginComponent,
    AnonymousLoginComponent,
    LoadingOverlayComponent,
    AdminPanelComponent,
    ProfileCardComponent,
    ChatRoomListComponent,
    AdminsListComponent,
    CreateChatroomComponent,
    ViewChatroomComponent,
    ChatMessageComponent,
    CreateAdminComponent,
    AdminListComponent,
    AddPartecipantsComponent,
    UserPanelComponent,
    AttachmentUploadComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    AppRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatMenuModule,

    JwtModule.forRoot({
      config: {
        allowedDomains: [baseUrl],
        tokenGetter: tokenGetter
      }
    }),
    MatSlideToggleModule,
    MatRippleModule,
    ScrollingModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [
    {
    provide: ErrorHandler,
    useClass: HttpErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorModule,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }












/*import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {LoginComponent} from './login/login.component';
import {AnonymousLoginComponent} from './anonymous-login/anonymous-login.component';
import {AuthenticatedLoginComponent} from './authenticated-login/authenticated-login.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {LoadingOverlayComponent} from './loading-overlay/loading-overlay.component';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthenticatedLoginComponent,
    AnonymousLoginComponent,
    LoadingOverlayComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatListModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/
