import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavService } from '../app/services/nav/nav.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { UserResolverService } from './services/guards/user-resolver/user-resolver.service';
import { PermissionResolverService } from './services/guards/permission-resolver/permission-resolver.service';
import { AuthGuardService } from '../app/services/guards/auth-guard/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppErrorHandler } from './common/app-error-handler';
import { DataTableModule, SharedModule, FileUploadModule, ChipsModule, TabViewModule, DropdownModule, MultiSelectModule, BreadcrumbModule } from 'primeng/primeng';
import { RatingModule } from 'ngx-rating';
import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ErrorService } from './services/error/error.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ChartModule } from 'primeng/chart';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Angular Material Modules
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";

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
import { AuthInterceptor } from './common/auth.interceptor';
import { SurveyService } from './services/survey/survey.service';
import { DashboardService } from './services/dashboard/dashboard.service';
import { DashboardCardsComponent } from './components/charts/dashboard-cards/dashboard-cards.component';
import { ViewUserComponent } from './components/dialogs/view-user/view-user.component';

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
    ViewUserComponent
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
    FileUploadModule,
    ChipsModule,
    TabViewModule,
    RatingModule,
    DropdownModule,
    MultiSelectModule,
    NgSelectModule,
    NgxChartsModule,
    Ng2SmartTableModule,
    MatTabsModule,
    MatSelectModule,
    MatMenuModule,
    MatRadioModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule,
    NgxDatatableModule,
    InputSwitchModule,
    LoadingBarHttpClientModule,
    ChartModule,
    McBreadcrumbsModule.forRoot(),
    ChartsModule,
    BreadcrumbModule
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
    ErrorService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewUserComponent
  ]
})
export class AppModule { }
