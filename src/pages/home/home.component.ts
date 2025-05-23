import { Component, inject } from '@angular/core';
import { Card } from '../../components/card/card.component';
import { RecipeService } from '../../services/recipe.service';
import { map, Observable } from 'rxjs';
import { API } from '../../model';
import { AsyncPipe } from '@angular/common';
import { Pagination } from '../../components/pagination/pagination.component';
import { Router } from '@angular/router';

@Component({
  selector: 'page-home',
  imports: [Card, Pagination, AsyncPipe, Pagination],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePage {
  recipe$!: Observable<API.PaginatedRecipe>;
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  pagesCount = 0;
  pagesCurrent = 0;

  constructor() {
    const usp = new URLSearchParams(location.search);
    const page = Number(usp.get('page') || 1);

    this.pagesCurrent = page;

    this.recipe$ = this.recipeService.getAllRecipes(page);

    this.recipe$.subscribe((r) => {
      this.pagesCount = r.countPages;
    });
  }

  changePage(page: number) {
    this.pagesCurrent = page;
    this.router.navigate([''], { queryParams: { page } });
    this.recipe$ = this.recipeService.getAllRecipes(page);
  }
}
