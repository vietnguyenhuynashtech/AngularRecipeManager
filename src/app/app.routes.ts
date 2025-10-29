import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { Home } from './home/home';

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
    }
];
