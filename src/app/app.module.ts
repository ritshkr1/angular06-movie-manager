import { BrowserModule , Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { MoviesComponent } from './components/list-movies/movies.component';

import { MoviesService } from './services/movies.service';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { QualitiesService } from './services/qualities.service';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    AddMovieComponent,
    EditMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    MoviesService,
    QualitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
