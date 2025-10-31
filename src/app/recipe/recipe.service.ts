import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiPaths } from '../config/api-paths';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(ApiPaths.recipes); 
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${ApiPaths.recipes}/${id}`);
  }

  updateRecipe(id: number, updatedRecipe: Recipe): Observable<void> {
    return this.http.put<void>(`${ApiPaths.recipes}/${id}`, updatedRecipe);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(ApiPaths.recipes, recipe);
  }
}
