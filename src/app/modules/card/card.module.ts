import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { BaseCardComponent } from './base-card.component';

@NgModule({
  declarations: [BaseCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [BaseCardComponent],
})
export class CardModule { }
