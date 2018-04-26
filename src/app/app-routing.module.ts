import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SurveyComponent } from './components/surveys/survey.component';
import { TrainingComponent } from './components/training/training.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AccountComponent } from './components/account/account.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ManageUsersComponent } from './components/supervisor-tools/manage-users/manage-users.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', pathMatch: 'full', redirectTo: '/login'},
    {path: '', component: HomeComponent, canActivate: [AuthGuardService], children: [
        {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
        {path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService]},
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
        {path: 'survey', component: SurveyComponent, canActivate: [AuthGuardService]},
        {path: 'training', component: TrainingComponent, canActivate: [AuthGuardService]},

        {path: 'supervisor_tools', children: [
            {path: 'manage_users', component: ManageUsersComponent, canActivate: [AuthGuardService]},
            {path: 'manage_users/user/create', component: UserProfileComponent, canActivate: [AuthGuardService]},
            {path: 'manage_users/user/:id', component: UserProfileComponent, canActivate: [AuthGuardService]},
            {path: 'team_surveys', component: SurveyComponent, canActivate: [AuthGuardService]},
            {path: '', pathMatch: 'full', redirectTo: 'manage_users'}  
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
