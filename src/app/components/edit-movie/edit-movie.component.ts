import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from '../../interfaces/movie';
import { QualitiesService } from 'src/app/services/qualities.service';
import { Quality } from 'src/app/interfaces/quality';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  
  movie:Movie;
  qualities:Quality[];
  
  constructor(
    private movieService:MoviesService, 
    private qualitiesService:QualitiesService,
    private router:Router,
    private route:ActivatedRoute, 
    ) { }
    
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
      this.qualitiesService.getAll().subscribe((qualities:Quality[]) =>{
        this.qualities = qualities;
      });       
      
      this.route.params.subscribe((params)=>{
        let movieId:string = params.id;        
        this.movieService.get(movieId).subscribe((movie:Movie)=>{
          this.movie = movie;
        });
      });
    }
    
    // Update the movie details
    editMovie(){    
      this.movieService.update(this.movie.id, this.movie).subscribe((res)=>{
        console.log('Movie Updated Sucessfully'); 
        this.router.navigate(['movies']);
      });  
    }
  
  }
  