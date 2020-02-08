import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './page/login/login.component';

import { SidenavComponent } from './modules/sidenav/sidenav.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: '**', component: SidenavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
