import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.component';
import { RandomPage } from '../pages/random/random.component';
import { NewPage } from '../pages/new/new.component';
import { RecipePage } from '../pages/recipe/recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'recipe/:id',
    component: RecipePage,
  },
  {
    path: 'random',
    component: RandomPage,
  },
  {
    path: 'new',
    component: NewPage,
  },
];
