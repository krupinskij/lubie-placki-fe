import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API } from '../model';
import { z } from 'zod';

const IdSchema = API.RecipeSchema.pick({ id: true });
const CreateRecipeSchema = API.RecipeSchema.omit({ id: true, author: true });

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  getAllRecipes(): Observable<API.Recipe[]> {
    return this.http
      .get(`http://localhost:8080/recipes`, { withCredentials: true })
      .pipe(map((r) => z.array(API.RecipeSchema).parse(r)));
  }

  getRecipe(id: string): Observable<API.Recipe> {
    return this.http
      .get(`http://localhost:8080/recipes/${id}`, { withCredentials: true })
      .pipe(map((r) => API.RecipeSchema.parse(r)));
  }

  getRandomId(): Observable<Pick<API.Recipe, 'id'>> {
    return this.http
      .get(`http://localhost:8080/recipes/random`, { withCredentials: true })
      .pipe(map((r) => IdSchema.parse(r)));
  }

  postRecipe(
    recipe: DeepPartial<API.Recipe>
  ): Observable<Pick<API.Recipe, 'id'>> {
    return this.http
      .post(`http://localhost:8080/recipes`, CreateRecipeSchema.parse(recipe), {
        withCredentials: true,
      })
      .pipe(map((r) => IdSchema.parse(r)));
  }
}
