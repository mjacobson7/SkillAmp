import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NavService } from '../app/services/nav/nav.service';
import { DataService } from '../app/services/data/data.service';
import { UserService } from '../app/services/user-auth/user-auth.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppErrorHandler } from './common/app-error-handler';
import { Routes, RouterModule } from '@angular/router';
import {DataTableModule, SharedModule, ChartModule, FileUploadModule, ChipsModule, TabViewModule} from 'primeng/primeng';
import {RatingModule} from 'ngx-rating';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HeaderComponent } from './components/header/header.component';
import { ChartsComponent } from './components/charts/charts.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CustomerSatisfactionComponent } from './components/customer-satisfaction/customer-satisfaction.component';
import { SupervisorEvaluationsComponent } from './components/supervisor-evaluations/supervisor-evaluations.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AccountComponent } from './components/account/account.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { TablesComponent } from './components/tables/tables.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { ReviewSortComponent } from './components/review-sort/review-sort.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
  {path: 'myprofile', component: MyProfileComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'customersatisfaction', component: CustomerSatisfactionComponent},
  {path: 'supervisorevaluations', component: SupervisorEvaluationsComponent},
  {path: 'my_team', component: MyTeamComponent},
  {path: 'manage_users', component: ManageUsersComponent},
  {path: 'manage_users/edit_user', component: AddEditUserComponent},
  {path: 'manage_users/edit_user/:id', component: AddEditUserComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'account', component: AccountComponent},
  {path: 'globalsettings', component: GlobalSettingsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    DashboardComponent,
    SignInComponent,
    HeaderComponent,
    ChartsComponent,
    UserProfileComponent,
    CustomerSatisfactionComponent,
    SupervisorEvaluationsComponent,
    MyTeamComponent,
    ManageUsersComponent,
    ReportsComponent,
    AccountComponent,
    GlobalSettingsComponent,
    TablesComponent,
    MessagesComponent,
    PageHeaderComponent,
    AddEditUserComponent,
    MyProfileComponent,
    ReviewCardComponent,
    ReviewSortComponent,
    PageNotFoundComponent,
    NotFoundComponent
    ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    ChartModule,
    FileUploadModule,
    ChipsModule,
    TabViewModule,
    RatingModule,
    MatTabsModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataService,
    UserService, 
    NavService,
    { provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
