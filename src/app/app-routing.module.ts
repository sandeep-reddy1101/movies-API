import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  {path : '', redirectTo : 'movies', pathMatch : 'full'},
  {path : 'movies', component : MoviesComponent},
  {path : 'movie/:id', component : MovieDetailsComponent},
  {path : '**', redirectTo : 'movies', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
