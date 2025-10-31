import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.scss',
})
export class RecipeEdit implements OnInit {  
  public recipeToEdit$!: Observable<Recipe | undefined>;
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
      this.recipeToEdit$ = this.recipeService.getRecipe(parseInt(id)).pipe(
        tap(recipe => {
          if (recipe) {
            this.recipeId = recipe.id;
            this.editMode = true;
            this.imageUrl.set(recipe.imagePath);
            this.recipeForm = new FormGroup({
              'name': new FormControl(recipe.name, Validators.required),
              'description': new FormControl(recipe.description, Validators.required),
              'catetory': new FormControl(recipe.catetory, Validators.required),
              'imagePath': new FormControl(recipe.imagePath, Validators.required)
            });
          }
        })
      );
    }
  }

  onSubmit() {
    if (this.editMode && this.recipeId != undefined  && this.recipeForm != undefined) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    }
    this.onCancel();
  }
  
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
