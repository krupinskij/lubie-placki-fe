import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API } from '../model';
import { environment } from '../environments/environment';

const IdSchema = API.RecipeSchema.pick({ id: true });
const CreateRecipeSchema = API.RecipeSchema.omit({ id: true, author: true });

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  getAllRecipes(page: number = 1): Observable<API.PaginatedRecipe> {
    return this.http
      .get(`${environment.apiUrl}/recipes`, {
        params: { page },
        withCredentials: true,
      })
      .pipe(map((r) => API.PaginatedRecipeSchema.parse(r)));
  }

  getRecipe(id: string): Observable<API.Recipe> {
    return this.http
      .get(`${environment.apiUrl}/recipes/${id}`, { withCredentials: true })
      .pipe(map((r) => API.RecipeSchema.parse(r)));
  }

  getRandomId(): Observable<Pick<API.Recipe, 'id'>> {
    return this.http
      .get(`${environment.apiUrl}/recipes/random`, { withCredentials: true })
      .pipe(map((r) => IdSchema.parse(r)));
  }

  postRecipe(
    recipe: DeepPartial<API.Recipe>
  ): Observable<Pick<API.Recipe, 'id'>> {
    return this.http
      .post(`${environment.apiUrl}/recipes`, CreateRecipeSchema.parse(recipe), {
        withCredentials: true,
      })
      .pipe(map((r) => IdSchema.parse(r)));
  }
}
