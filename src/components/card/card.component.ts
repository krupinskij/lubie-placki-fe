import { Component, input } from '@angular/core';
import { Recipe } from '../../model';

@Component({
  selector: 'component-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class Card {
  recipe = input<Recipe>();
}
