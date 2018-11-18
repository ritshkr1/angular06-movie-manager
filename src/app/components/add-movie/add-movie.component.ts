import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';


import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import { Quality } from '../../interfaces/quality';
import { QualitiesService } from 'src/app/services/qualities.service';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  
  constructor(
    private router: Router,
    private movieService: MoviesService,
    private qualitiesService:QualitiesService
    ) { }
    
    movie:Movie;
    qualities:Quality[];
    
    ngOnInit() {

      // Set Defualt values
      this.movie = {
        path:"",
        quality:'',
        name:'',
        downloads:0
      };
      
      this.qualities = []
      
      // Get Qualities from server
      this.qualitiesService.get().subscribe((qualities:Quality[]) =>{
        this.qualities = qualities;
      });

    }
    
    // Post data to server
    addMovie(){      
      this.movieService.add(this.movie).subscribe((res)=>{
        console.log('Movie Added Sucessfully'); 
        this.router.navigate(['movies']);
      });

    }
    
  }
  