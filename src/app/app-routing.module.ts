import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './page/login/login.component';

import { CategoryComponent } from './modules/categories/category/category.component';
import { DashboardComponent } from './modules/dashboards/dashboard/dashboard.component';
import { SidenavComponent } from './modules/sidenav/sidenav.component';
import { WalletComponent } from './modules/wallets/wallet/wallet.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'app', component: SidenavComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'category', component: CategoryComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
