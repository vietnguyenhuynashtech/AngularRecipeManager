import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeEdit } from './recipe-edit/recipe-edit';
import { Home } from './home/home';
import { RecipeCreate } from './recipe-create/recipe-create';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: Home
    },
    {
        path: 'recipes',
        title: 'Recipe List',
        component: RecipeList
    },    
    {
        path: 'recipes/:id/edit',
        title: 'Edit Recipe',
        component: RecipeEdit
    },
    {
        path: 'recipes/create',
        component: RecipeCreate
    }
];
