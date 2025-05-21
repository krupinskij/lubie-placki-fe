import { Component, inject } from '@angular/core';
import { Card } from '../../components/card/card.component';
import { RecipeService } from '../../services/recipe.service';
import { Observable } from 'rxjs';
import { API } from '../../model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'page-home',
  imports: [Card, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePage {
  recipe$!: Observable<API.Recipe[]>;
  private recipeService = inject(RecipeService);

  constructor() {
    this.recipe$ = this.recipeService.getAllRecipes();
  }
}
