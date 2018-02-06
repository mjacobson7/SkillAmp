import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { SupervisorEvaluationsComponent } from './components/supervisor-evaluations/supervisor-evaluations.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AccountComponent } from './components/account/account.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ViewAllUsersComponent } from './components/manage-users/view-all-users/view-all-users.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', pathMatch: 'full', redirectTo: '/login'},    
    {path: '', component: HomeComponent, canActivate: [AuthGuardService], children: [
        {path: 'myprofile', component: MyProfileComponent},
        {path: 'messages', component: MessagesComponent},
        {path: 'dashboard', component: DashboardComponent},
        {path: 'feedback', component: FeedbackComponent},
        {path: 'supervisorevaluations', component: SupervisorEvaluationsComponent},
        {path: 'manage_users', component: ManageUsersComponent, children: [
            {path: '', component: ViewAllUsersComponent},
            {path: 'add-user', component: AddEditUserComponent},
            {path: 'edit_user/:id', component: AddEditUserComponent},
        ]},
        {path: 'reports', component: ReportsComponent},
        {path: 'account', component: AccountComponent},
        {path: 'globalsettings', component: GlobalSettingsComponent},
    ]},

    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
  ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})

export class AppRoutingModule {

}