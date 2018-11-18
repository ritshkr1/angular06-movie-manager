import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';

// Configuration file
import { appConfig } from '../../config/globel.conf'

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
    this.movieService.get().subscribe((movies:Movie[]) =>{
      // console.log(movies);
      
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
      this.countDownloads(movie);
      movie.details = true;
    }      
    else {
      movie.details = !movie.details;
    }    
  }

  countDownloads(movie:Movie){
    movie.downloads = movie.downloads+1;
    this.movieService.update(movie).subscribe((res)=>{
      console.log('Update Successfull');
    })
  }
  
  /* To copy Text from Textbox */
  // copyInputMessage(inputElement){
  //   inputElement.select();
  //   document.execCommand('copy');
  //   inputElement.setSelectionRange(0, 0);
  // }  
}
