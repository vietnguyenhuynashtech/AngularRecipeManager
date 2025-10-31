import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';

@Component({
  selector: 'app-recipe-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-create.html',
  styleUrls: ['./recipe-create.scss'],
})
export class RecipeCreate {
  recipeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required)
  });

  constructor(private recipeService: RecipeService, private router: Router) {}

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      const recipe: Recipe = {
        id: 0, // or use undefined/null if your backend generates the id
        name: formValue.name ?? '',
        description: formValue.description ?? '',
        catetory: formValue.category ?? '', // note: use 'catetory' as per your Recipe type
        imagePath: formValue.imagePath ?? ''
      };
      this.recipeService.createRecipe(recipe).subscribe({
        next: () => this.router.navigate(['/recipes']),
        error: err => console.error('Create failed', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }
}