import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration/administration.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'categories/:tag', component: CategoriesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'administration', component: AdministrationComponent },
  {path: '', redirectTo: '/home',pathMatch: 'full'},
  { path        : '**', pathMatch   : 'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    //, { onSameUrlNavigation: 'reload'}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
