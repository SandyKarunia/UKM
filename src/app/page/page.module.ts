import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { CardModule } from 'src/app/modules/card/card.module';
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
    RouterModule,
    CardModule,
    MatGridListModule
  ],
  exports: [
    LoginPageComponent,
    WalletShowPageComponent
  ]
})
export class PageModule { }
