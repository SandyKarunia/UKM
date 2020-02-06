import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  declarations: [ WalletComponent ],
  imports: [
    CommonModule
  ],
  exports: [ WalletComponent ],
})
export class WalletsModule { }
