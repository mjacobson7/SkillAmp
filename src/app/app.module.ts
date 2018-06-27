// Angular Libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Angular Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


// Prime NG Modules
import { DataTableModule, SharedModule, CheckboxModule, InputSwitchModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';


// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { SurveyChartComponent } from './components/charts/survey-chart/survey-chart.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SurveyComponent } from './components/surveys/survey.component';
import { GlobalSettingsComponent } from './components/global-settings/global-settings.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ManageUsersComponent } from './components/supervisor-tools/manage-users/manage-users.component';
import { SurveyFiltersComponent } from './components/survey-filters/survey-filters.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { DashboardCardsComponent } from './components/charts/dashboard-cards/dashboard-cards.component';
import { ViewUserComponent } from './components/dialogs/view-user/view-user.component';


// Services
import { SurveyService } from './services/survey/survey.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { NavService } from '../app/services/nav/nav.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { AuthInterceptor } from './common/auth.interceptor';
import { UserResolverService } from './services/guards/user-resolver/user-resolver.service';
import { AuthGuardService } from '../app/services/guards/auth-guard/auth-guard.service';
import { PermissionResolverService } from './services/guards/permission-resolver/permission-resolver.service';

// Miscelaneous Libraries
import { RatingModule } from 'ngx-rating';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SlideToggleModule } from 'ng2-slide-toggle';
import { SuperTableModule } from 'ngx-super-table';
import { TableComponent } from './components/table/table.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    SurveyChartComponent,
    UserProfileComponent,
    SurveyComponent,
    GlobalSettingsComponent,
    AddEditUserComponent,
    ReviewCardComponent,
    NotFoundComponent,
    ManageUsersComponent,
    SurveyFiltersComponent,
    LeaderboardComponent,
    DashboardCardsComponent,
    ViewUserComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTableModule,
    SharedModule,
    RatingModule,
    NgSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatPaginatorModule,
    LoadingBarHttpClientModule,
    McBreadcrumbsModule.forRoot(),
    ChartsModule,
    CheckboxModule,
    MatSlideToggleModule,
    InputSwitchModule,
    SlideToggleModule,
    TableModule,
    MatTableModule,
    MatSortModule,
    SuperTableModule
  ],
  providers: [
    UserService,
    NavService,
    AuthService,
    AuthGuardService,
    UserResolverService,
    PermissionResolverService,
    SurveyService,
    DashboardService,
    // { provide: ErrorHandler, useClass: ErrorService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewUserComponent
  ]
})
export class AppModule { }
