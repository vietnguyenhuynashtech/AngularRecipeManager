import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.scss',
})
export class RecipeEdit implements OnInit {  
  public recipeToEdit: Recipe | undefined;
  public recipeId: number | undefined;
  public editMode: boolean = false;
  public recipeForm: FormGroup | undefined;
  imageUrl = signal('');

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      this.recipeService.getRecipe(parseInt(id)).subscribe({
        next: (recipe) => {
          if (recipe) {
            this.recipeToEdit = recipe;
            this.editMode = true;
            this.recipeId = recipe.id;
            this.imageUrl = signal(recipe.imagePath);
            this.recipeForm = new FormGroup({
              'name': new FormControl(recipe.name, Validators.required),
              'description': new FormControl(recipe.description, Validators.required),
              'catetory': new FormControl(recipe.catetory, Validators.required),
              'imagePath': new FormControl(recipe.imagePath, Validators.required)
            });
          }
        },
        error: (err) => {
          console.error('Failed to load recipe', err);
        }
      });
    }
  }

  onSubmit() {
    // Determine the action based on the mode
    if (this.editMode && this.recipeId != undefined  && this.recipeForm != undefined) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    }
    
    // Navigate back to the recipe list
    this.onCancel();
  }
  
  // Method to handle canceling the form
  onCancel() {
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

  onImagePathChange() {
    if (this.recipeForm) {
      const imagePath = this.recipeForm.get('imagePath')?.value;
      this.imageUrl.set(imagePath);
    }
  }
}
