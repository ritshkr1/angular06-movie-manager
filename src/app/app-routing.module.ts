import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/list-movies/movies.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';

const routes: Routes = [
  { path:"", redirectTo:'movies', pathMatch: 'full' },
  { path:"movies", component: MoviesComponent },
  { path:"add", component: AddMovieComponent },
  { path:"edit/:id", component: EditMovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
