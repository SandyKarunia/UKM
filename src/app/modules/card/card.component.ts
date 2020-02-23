import { Component, Input } from '@angular/core';

@Component({
  selector: 'ukm-std-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() value: string;
}
