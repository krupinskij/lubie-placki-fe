import { Component, effect, inject, signal } from '@angular/core';
import { Card } from '@components/card/card.component';
import { RecipeService } from '@services/recipe.service';
import { Observable } from 'rxjs';
import { API } from '@model';
import { AsyncPipe } from '@angular/common';
import { Pagination } from '@components/pagination/pagination.component';
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

  pagesCount = signal(0);
  pagesCurrent = signal(0);

  constructor() {
    const usp = new URLSearchParams(location.search);
    const page = Number(usp.get('page') || 1);

    this.pagesCurrent.set(page);

    effect(() => {
      this.recipe$ = this.recipeService.getAllRecipes(this.pagesCurrent());
      this.recipe$.subscribe(({ countPages }) => {
        this.pagesCount.set(countPages);
      });
    });
  }

  changePage(page: number) {
    this.pagesCurrent.set(page);
    this.router.navigate([''], { queryParams: { page } });
  }
}
