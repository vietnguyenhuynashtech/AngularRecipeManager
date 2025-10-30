import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (err) => {
        console.error('Failed to load recipes', err);
      }
    });
  }
}
