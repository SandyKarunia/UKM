import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { LoginPageComponent } from './page/login/login.component';

import { CategoryComponent } from './modules/categories/category/category.component';
import { DashboardComponent } from './modules/dashboards/dashboard/dashboard.component';
import { SidenavComponent } from './modules/sidenav/sidenav.component';
import { WalletShowPageComponent } from './page/wallet-show-page/wallet-show-page.component';

const redirectToLogin = (): void => {
  redirectUnauthorizedTo(['']);
};

const redirectToHome = (): void => {
  redirectLoggedInTo(['app/dashboard']);
};

export const routes: Routes = [
  { path: '', component: LoginPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToHome } },
  {
    path: 'app', component: SidenavComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'wallet', component: WalletShowPageComponent },
      { path: 'category', component: CategoryComponent }
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
