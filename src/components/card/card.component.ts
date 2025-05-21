import { Component, input } from '@angular/core';
import { API } from '../../model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'component-card',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class Card {
  recipe = input<API.Recipe>();
}
