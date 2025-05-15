import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../model';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'page-recipe',
  imports: [AsyncPipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipePage {
  private route: ActivatedRoute = inject(ActivatedRoute);

  recipe$!: Observable<Recipe>;
  private recipeService = inject(RecipeService);

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.recipe$ = this.recipeService.getRecipe(id);
  }
}
