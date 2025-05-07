import { Routes } from '@angular/router';
import { HomePage } from '../pages/homepage/homepage.component';
import { RandomPage } from '../pages/random/random.component';
import { NewPage } from '../pages/new/new.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
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
