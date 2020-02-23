import { Component, Input } from '@angular/core';

@Component({
  selector: 'ukm-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss']
})

/**
 * Base model of card in UKM in terms of design and functionality
 */

export class BaseCardComponent {
  @Input() value: string;
}
