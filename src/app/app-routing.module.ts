import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { TrainingComponent } from './components/training/training.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AccountComponent } from './components/account/account.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ViewAllUsersComponent } from './components/manage-users/view-all-users/view-all-users.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', pathMatch: 'full', redirectTo: '/login'},
    {path: '', component: HomeComponent, canActivate: [AuthGuardService], children: [
        {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
        {path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService]},
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
        {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuardService]},
        {path: 'training', component: TrainingComponent, canActivate: [AuthGuardService]},
        {path: 'manage_users', component: ManageUsersComponent, canActivate: [AuthGuardService], children: [
            {path: '', component: ViewAllUsersComponent, canActivate: [AuthGuardService]},
            {path: 'add-user', component: AddEditUserComponent, canActivate: [AuthGuardService]},
            {path: 'edit_user/:id', component: AddEditUserComponent, canActivate: [AuthGuardService]},
        ]},
        {path: 'reports', component: ReportsComponent, canActivate: [AuthGuardService]},
        {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
        {path: 'settings', component: GlobalSettingsComponent, canActivate: [AuthGuardService]},
    ]},

    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
  ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})

export class AppRoutingModule {

}
