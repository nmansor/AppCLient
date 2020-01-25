import { NgModule, ResolvedReflectiveFactory } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDocumentBaseComponent } from './create-document-base/create-document-base.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CreateDocumentComponent } from './agreements/create-document/create-document.component';

import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ViewProfileComponent } from './users/view-profile/view-profile.component';

import { RegisterComponent } from './user/register/register.component';
import { UpdateMyProfileComponent } from './user/update-myProfile/update-myProfile.component';

import { AgreementsListComponent } from './agreements/agreements-list/agreements-list.component';
import { ViewDocumentComponent } from './agreements/view-document/view-document.component';
import { FillAgreementComponent } from './agreements/fill-agreement/fill-agreement.component';
import { CreateAgreementCanDeactivateGuardService } from './shared/services/create-agreement-guard.service';

const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
      path: 'home',
      component: HomeComponent,
      children: [
        { path: ' ', component: HomeComponent },
        { path: 'agreements/:status/:year/:month', component: AgreementsListComponent }
      ]
  },
  {
    path: 'create-base-document',
    component: CreateDocumentBaseComponent
  },
  {
    path: 'update-myprofile',
    component: UpdateMyProfileComponent
  },
  {
    path: 'create-document',
    component: CreateDocumentComponent
  },
  {
    path: 'view-document/:id',
    component: ViewDocumentComponent
  },
  {
    path: 'fill-agreement/:docSelected',
    component: FillAgreementComponent, canDeactivate: [CreateAgreementCanDeactivateGuardService]
  },
  {
    path: 'agreements',
    component: AgreementsListComponent
  },
  {
    path: 'users',
    component: ListUsersComponent,
    children: [
      {
        path: 'view-profile/:id',
        component: ViewProfileComponent
      }
    ]
  },
  {
    path: 'update-profile/:id',
    component: UpdateMyProfileComponent
  },
  // {
  //   path: 'view-profile/:id',
  //   component: ViewProfileComponent
  // },
  {
    path: '',
    component: HomeComponent
  },
  { path: '**', component: NotFoundComponent}
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
