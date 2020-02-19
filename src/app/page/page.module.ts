import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginPageComponent } from './login/login.component';
import { WalletShowPageComponent } from './wallet-show-page/wallet-show-page.component';

import { RouterModule } from '@angular/router';
import { AuthModule } from 'src/app/modules/auth/auth.module';

@NgModule({
  declarations: [
    LoginPageComponent,
    WalletShowPageComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule
  ],
  exports: [
    LoginPageComponent,
    WalletShowPageComponent
  ]
})
export class PageModule { }
