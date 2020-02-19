import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './page/login/login.component';

import { CategoryComponent } from './modules/categories/category/category.component';
import { DashboardComponent } from './modules/dashboards/dashboard/dashboard.component';
import { SidenavComponent } from './modules/sidenav/sidenav.component';
import { WalletShowPageComponent } from './page/wallet-show-page/wallet-show-page.component';

export const routes: Routes = [
  {
    path: '', component: LoginPageComponent,
    ...canActivate(redirectLoggedInTo(['app/dashboard'])),
  },
  {
    path: 'app', component: SidenavComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'wallet', component: WalletShowPageComponent },
      { path: 'category', component: CategoryComponent }
    ],
    ...canActivate(redirectUnauthorizedTo([''])),

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
