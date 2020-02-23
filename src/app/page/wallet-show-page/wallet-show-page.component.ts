import { Component } from '@angular/core';

@Component({
  selector: 'ukm-wallet-page',
  templateUrl: './wallet-show-page.component.html',
  styleUrls: ['./wallet-show-page.component.scss']
})
export class WalletShowPageComponent {

  public allWallet: string[];
  constructor() {
    this.allWallet = [];
    const totalWallet: number = 10;
    this.allWallet.push('+');
    for (let i: number = 0; i < totalWallet; i += 1) {
      this.allWallet.push('wallet');
    }
  }
}
