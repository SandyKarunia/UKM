import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './modules/dashboards/dashboard/dashboard.component';
import { DashboardsModule } from './modules/dashboards/dashboards.module';

import { WalletComponent } from './modules/wallets/wallet/wallet.component';
import { WalletsModule } from './modules/wallets/wallets.module';

import { CategoriesModule } from './modules/categories/categories.module';
import { CategoryComponent } from './modules/categories/category/category.component';

import { LoginPageComponent } from './page/login/login.component';
import { PageModule } from './page/page.module';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'category', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CategoriesModule, DashboardsModule, WalletsModule, PageModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
