import { Component, inject } from '@angular/core';
import { RecipeService } from '@services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'random-new',
  templateUrl: 'random.component.html',
  styleUrl: 'random.component.scss',
})
export class RandomPage {
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  constructor() {
    this.recipeService.getRandomId().subscribe(({ id }) => {
      this.router.navigate([`/recipe/${id}`]);
    });
  }
}
