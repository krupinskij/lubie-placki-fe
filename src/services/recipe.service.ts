import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`http://localhost:8080/recipes`);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`http://localhost:8080/recipes/${id}`);
  }
}
