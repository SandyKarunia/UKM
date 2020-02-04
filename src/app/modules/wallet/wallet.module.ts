import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WalletComponent } from './wallet-component/wallet.component';

@NgModule({
  declarations: [ WalletComponent ],
  imports: [
    CommonModule
  ],
  exports: [ WalletComponent ],
})
export class WalletModule { }
