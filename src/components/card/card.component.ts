import { Component, input } from '@angular/core';
import { API } from '../../model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'component-card',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class Card {
  recipe = input<API.Recipe>();

  getLink(path: string): string {
    return `${environment.apiUrl}${path}`;
  }
}
