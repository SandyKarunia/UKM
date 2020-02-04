import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './modules/dashboard/dashboard-component/dashboard.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { WalletComponent } from './modules/wallet/wallet-component/wallet.component';
import { WalletModule } from './modules/wallet/wallet.module';

import { CategoryComponent } from './modules/category/category-component/category.component';
import { CategoryModule } from './modules/category/category.module';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'category', component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CategoryModule, DashboardModule, WalletModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
