import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerSatisfactionComponent } from './components/customer-satisfaction/customer-satisfaction.component';
import { SupervisorEvaluationsComponent } from './components/supervisor-evaluations/supervisor-evaluations.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AccountComponent } from './components/account/account.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
    {path: 'myprofile', component: MyProfileComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'customersatisfaction', component: CustomerSatisfactionComponent},
    {path: 'supervisorevaluations', component: SupervisorEvaluationsComponent},
    {path: 'my_team', component: MyTeamComponent},
    {path: 'manage_users', component: ManageUsersComponent,
    {path: 'manage_users/edit_user', component: AddEditUserComponent},
    {path: 'manage_users/edit_user/:id', component: AddEditUserComponent},
    {path: 'reports', component: ReportsComponent},
    {path: 'account', component: AccountComponent},
    {path: 'globalsettings', component: GlobalSettingsComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}