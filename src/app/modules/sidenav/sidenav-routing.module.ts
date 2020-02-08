import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../categories/category/category.component';
import { DashboardComponent } from '../dashboards/dashboard/dashboard.component';
import { WalletComponent } from '../wallets/wallet/wallet.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, outlet: 'sidenav' },
  { path: 'wallet', component: WalletComponent, outlet: 'sidenav' },
  { path: 'category', component: CategoryComponent, outlet: 'sidenav' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
