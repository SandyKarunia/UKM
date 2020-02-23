import { Component } from '@angular/core';

@Component({
  selector: 'ukm-wallet-page',
  templateUrl: './wallet-show-page.component.html',
  styleUrls: ['./wallet-show-page.component.scss']
})
export class WalletShowPageComponent {

  public allWallets: string[];

  constructor() {
    this.allWallets = [];

    // TODO: remove dummy data
    const totalWallet: number = 10;
    for (let i: number = 0; i < totalWallet; i += 1) {
      this.allWallets.push('wallet');
    }

    this.allWallets.push('+');
  }
}
