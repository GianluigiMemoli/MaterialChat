import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../login/login.component';
import {RouterModule} from '@angular/router';
import {AdminPanelComponent} from '../admin-panel/admin-panel.component';
import {AuthGuard} from '../auth-guard.service';
import {CreateChatroomComponent} from '../create-chatroom/create-chatroom.component';
import {ViewChatroomComponent} from '../view-chatroom/view-chatroom.component';
import {CreateAdminComponent} from '../create-admin/create-admin.component';
import {UserPanelComponent} from '../user-panel/user-panel.component';
import {UserGuardGuard} from '../user-guard.guard';

const routes = [
  {path: '', component: LoginComponent},
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'createChatroom',
        component: CreateChatroomComponent
      },
      {
        path: 'viewChatroom/:shareble_link',
        component: ViewChatroomComponent
      },
      {
        path: 'createAdmin',
        component: CreateAdminComponent
      }
    ]
  },
  {
    path: 'home',
    component: UserPanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'viewChatroom/:shareble_link',
        component: ViewChatroomComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ]
})
export class AppRoutingModule { }
