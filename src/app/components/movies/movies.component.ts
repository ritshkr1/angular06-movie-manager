import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Movie } from './movie';


import { appConfig } from '../../config/globel.conf'

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies:Movie[];
  constructor(private movieService: MoviesService) {}
  
  ngOnInit() {
    this.listAll()
  }
  
  listAll(){
    this.movieService.getAll().subscribe((res) =>{
      this.movies = res
    })
  }
  
}
