import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies:Movie[] = [];
  constructor(private movieService: MoviesService) {}
  
  ngOnInit() {
    this.listAll()
  }
  
  listAll(){
    this.movieService.getAll().subscribe((movies:Movie[]) =>{
      this.movies = movies;
    });
  }
  
  remove(movie:Movie){
    this.movieService.delete(movie.id).subscribe((res) => {
      this.listAll();
    });
  }
  
  details(movie){
    if(!movie.details) {
      movie.details = true;
      this.countDownloads(movie);
    }      
    else {
      movie.details = !movie.details;
    }    
  }

  countDownloads(movie:Movie){
    if(movie.hasOwnProperty('downloads')) {
      movie.downloads = movie.downloads+1;
    }
    else{
      movie.downloads = 1;
    }
    let movieId = movie.id;
    // delete(movie.id);
    this.movieService.update(movieId, movie);
  }
  
  /* To copy Text from Textbox */
  // copyInputMessage(inputElement){
  //   inputElement.select();
  //   document.execCommand('copy');
  //   inputElement.setSelectionRange(0, 0);
  // }  
}
