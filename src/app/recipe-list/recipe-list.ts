import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList implements OnInit {
  recipes$!: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
