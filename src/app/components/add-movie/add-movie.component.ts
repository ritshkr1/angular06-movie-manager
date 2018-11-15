import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../movies/movie';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  constructor(private movieService: MoviesService) { }
  private movie:Movie;

  ngOnInit() {
    this.movie = {
      path:"path",
      quality:'720',
      name:'name'
    }
  }

  addMovie(){
    this.movieService.add(this.movie).subscribe((res)=>{
      console.log('Update Sucessfull');
      
    });       
  }

}
