import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/guards/auth-guard/auth-guard.service';
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
import { UserResolverService } from './services/guards/user-resolver/user-resolver.service';
import { PermissionResolverService } from './services/guards/permission-resolver/permission-resolver.service';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', pathMatch: 'full', redirectTo: '/login'},
    {path: '', component: HomeComponent, canActivate: [AuthGuardService], resolve: { user: UserResolverService, permissions: PermissionResolverService }, children: [
        {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], data: { breadcrumbs: 'Dashboard'}, resolve: { user: UserResolverService, permissions: PermissionResolverService }},
        {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService], data: { breadcrumbs: 'My Profile'}, resolve: { user: UserResolverService, permissions: PermissionResolverService }},
        {path: 'survey', component: SurveyComponent, canActivate: [AuthGuardService], data: { breadcrumbs: 'My Surveys'}, resolve: { user: UserResolverService, permissions: PermissionResolverService }},
        // {path: 'messages', component: MessagesComponent, canActivate: [AuthGuardService], data: { breadcrumbs: 'Messages'}, resolve: { user: UserResolverService, permissions: PermissionResolverService }},
        // {path: 'training', component: TrainingComponent, canActivate: [AuthGuardService], data: { breadcrumbs: 'Training'}, resolve: { user: UserResolverService, permissions: PermissionResolverService }},

        {path: 'supervisor_tools', data: { breadcrumbs: 'Supervisor Tools'}, children: [
            {path: 'manage_users', canActivate: [AuthGuardService], data: { breadcrumbs: 'Manage Users'}, resolve: { user: UserResolverService, permissions: PermissionResolverService }, children: [
                {path: '', component: ManageUsersComponent},
                {path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuardService], data: { breadcrumbs: 'Edit User'}, resolve: { user: UserResolverService, permissions: PermissionResolverService }},
            ]},
            

            {path: 'team_surveys', component: SurveyComponent, canActivate: [AuthGuardService], data: { breadcrumbs: 'Team Surveys'}, resolve: { user: UserResolverService, permissions: PermissionResolverService }},
            {path: '', pathMatch: 'full', redirectTo: 'manage_users'}  
        ]},

        // {path: 'reports', component: ReportsComponent, canActivate: [AuthGuardService], resolve: { user: UserResolverService, permissions: PermissionResolverService }},
        // {path: 'account', component: AccountComponent, canActivate: [AuthGuardService], resolve: { user: UserResolverService, permissions: PermissionResolverService }},
        // {path: 'settings', component: GlobalSettingsComponent, canActivate: [AuthGuardService], resolve: { user: UserResolverService, permissions: PermissionResolverService }},
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
