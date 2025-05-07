import { Component } from '@angular/core';
import { Recipe } from './home.model';
import { Card } from '../../components/card/card.component';

@Component({
  selector: 'page-home',
  imports: [Card],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePage {
  recipes: Recipe[] = [
    {
      title: 'Murzynek',
      img: 'https://cdn.aniagotuje.com/pictures/articles/2018/03/104896-v-1000x1000.jpg',
    },
    {
      title: 'Piernik',
      img: 'https://wszystkiegoslodkiego.pl/storage/images/202110/piernik-weganski.jpg',
    },
  ];
}
