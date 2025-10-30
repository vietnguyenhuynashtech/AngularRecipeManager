import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5233/recipes';
  private recipes: Recipe[] = [
    {
      id: 1,
      name: 'Sushi',
      description: 'Delicious sushi with fresh fish and rice.',
      catetory: 'Japanese',
      imagePath: 'https://www.happyfoodstube.com/wp-content/uploads/2016/03/homemade-sushi-picture.jpg'
    },
    {
      id: 2,
      name: 'Tacos',
      description: 'Spicy and flavorful Mexican tacos.',
      catetory: 'Mexican',
      imagePath: 'https://www.happyfoodstube.com/wp-content/uploads/2019/04/buffalo-chicken-tacos-picture.jpg'
    },
    {
      id: 3,
      name: 'Pizza',
      description: 'Classic Italian pizza with mozzarella and tomato sauce.',
      catetory: 'Italian',
      imagePath: 'https://www.happyfoodstube.com/wp-content/uploads/2015/12/homemade-pizza-dough-picture.jpg'
    },
    {
      id: 4,
      name: 'Croissant',
      description: 'Buttery and flaky French pastry.',
      catetory: 'French',
      imagePath: 'https://www.happyfoodstube.com/wp-content/uploads/2018/10/croissant-french-toast-picture.jpg'
    }
  ];

  getRecipes(): Observable<Recipe[]> {
    // Uses the HTTP GET method
    return this.http.get<Recipe[]>(this.apiUrl); 
  }

  getRecipe(id: number): Recipe | undefined {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  updateRecipe(id: number | undefined, updatedRecipe: Recipe): void {
    const index = this.recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
      this.recipes[index] = { ...updatedRecipe, id: id! };
    }
  }
}
