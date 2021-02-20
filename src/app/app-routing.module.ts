import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './components/actors/actors.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DirectorsComponent } from './components/directors/directors.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'actors', component: ActorsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'directors', component: DirectorsComponent },
  {path: '', redirectTo: '/login',pathMatch: 'full'},
  { path        : '**', pathMatch   : 'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
