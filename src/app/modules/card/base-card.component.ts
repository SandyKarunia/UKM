import { Component, Input } from '@angular/core';

@Component({
  selector: 'ukm-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss']
})
export class BaseCardComponent {
  @Input() value: string;
}
