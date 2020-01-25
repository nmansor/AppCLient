import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/materail.module';

import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './config/appConfig';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

import { UserService } from './shared/services/user.service';
import { LookupService } from './shared/services/lookup.service';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { RegisterComponent } from './user/register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule
  , MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule
  , MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { UpdateMyProfileComponent } from './user/update-myProfile/update-myProfile.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AgreementsListComponent } from './agreements/agreements-list/agreements-list.component';

import { ViewDocumentComponent } from './agreements/view-document/view-document.component';
import { CreateDocumentComponent } from './agreements/create-document/create-document.component';
import { FillAgreementComponent } from './agreements/fill-agreement/fill-agreement.component';
import { ViewProfileComponent } from './users/view-profile/view-profile.component';
import { CreateAgreementCanDeactivateGuardService } from './shared/services/create-agreement-guard.service';
import { DisplayAgreementsComponent } from './agreements/display-agreements/display-agreements.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { CreateDocumentBaseComponent } from './create-document-base/create-document-base.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    UpdateMyProfileComponent,
    ListUsersComponent,
    MainNavComponent,
    AgreementsListComponent,
    ViewDocumentComponent,
    CreateDocumentComponent,
    FillAgreementComponent,
    ViewProfileComponent,
    DisplayAgreementsComponent,
    ConfirmDialogComponent,
    StatusDialogComponent,
    CreateDocumentBaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MaterialModule,
    PdfViewerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [UserService, LookupService, AppConfig, CreateAgreementCanDeactivateGuardService],
  entryComponents: [ConfirmDialogComponent, StatusDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
