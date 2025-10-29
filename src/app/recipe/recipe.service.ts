import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      name: 'Sushi',
      description: 'Delicious sushi with fresh fish and rice.',
      catetory: 'Japanese',
      imagePath: 'https://www.happyfoodstube.com/wp-content/uploads/2016/03/homemade-sushi-picture.jpg'
    },
    {
      name: 'Tacos',
      description: 'Spicy and flavorful Mexican tacos.',
      catetory: 'Mexican',
      imagePath: 'https://www.happyfoodstube.com/wp-content/uploads/2019/04/buffalo-chicken-tacos-picture.jpg'
    },
    {
      name: 'Pizza',
      description: 'Classic Italian pizza with mozzarella and tomato sauce.',
      catetory: 'Italian',
      imagePath: 'https://www.happyfoodstube.com/wp-content/uploads/2015/12/homemade-pizza-dough-picture.jpg'
    },
    {
      name: 'Croissant',
      description: 'Buttery and flaky French pastry.',
      catetory: 'French',
      imagePath: 'https://www.happyfoodstube.com/wp-content/uploads/2018/10/croissant-french-toast-picture.jpg'
    }
  ];

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }
}
