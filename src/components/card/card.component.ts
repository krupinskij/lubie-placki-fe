import { Component, input } from '@angular/core';

@Component({
  selector: 'component-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class Card {
  title = input('');
  img = input('');
}
