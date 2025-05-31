import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '@model';
import { RecipeService } from '@services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'page-recipe',
  imports: [AsyncPipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
})
export class RecipePage {
  private route: ActivatedRoute = inject(ActivatedRoute);

  recipe$!: Observable<API.Recipe>;
  private recipeService = inject(RecipeService);

  constructor() {
    const id = this.route.snapshot.params['id'];
    this.recipe$ = this.recipeService.getRecipe(id);
  }

  getLink(path: string): string {
    return `${environment.apiUrl}${path}`;
  }
}
