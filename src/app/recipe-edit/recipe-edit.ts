import { Component, OnInit } from '@angular/core';
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
  public imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      const recipe = this.recipeService.getRecipe(parseInt(id));
      if (recipe) {
        this.recipeToEdit = recipe;
        this.editMode = true;
        this.recipeId = recipe.id;
        this.recipeForm = new FormGroup({
          'name': new FormControl(recipe.name, Validators.required),
          'description': new FormControl(recipe.description, Validators.required),
          'catetory': new FormControl(recipe.catetory, Validators.required),
          'imagePath': new FormControl(recipe.imagePath, Validators.required)
        });
      }

      if (this.recipeForm) {
          this.recipeForm.get('imagePath')?.valueChanges.subscribe(url => {
              this.imageUrl = url;
          });
          // Set initial value immediately after initForm() runs
          this.imageUrl = this.recipeForm.get('imagePath')!.value;
      }
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
}
