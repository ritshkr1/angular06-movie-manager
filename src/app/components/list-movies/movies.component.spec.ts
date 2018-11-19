import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { MoviesComponent } from './movies.component';
import { MoviesService } from 'src/app/services/movies.service';
import { QualitiesService } from 'src/app/services/qualities.service';
import { Movie } from 'src/app/interfaces/movie';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let moviesService: MoviesService;
  let fixture: ComponentFixture<MoviesComponent>;
  let de: DebugElement;
  let mockMovies : Movie[] = [
    {
      id: 1,
      path:"path1",
      quality:'720px',
      name:'film1',
      downloads:0,
      details:true
    },
    {
      id:2,
      path:"path2",
      quality:'1080px',
      name:'film2',
      downloads:0
    }
  ];
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers:[
        MoviesService,
        QualitiesService
      ]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;    
    fixture.detectChanges();
    moviesService =  TestBed.get(MoviesService);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('get ', () => {
    let listMovieSCompSpy:any;
    let getMovieSerSpy:any;
    
    beforeEach(()=>{
      listMovieSCompSpy = spyOn(component, 'listAll')
      .and.callThrough();
      
      getMovieSerSpy = spyOn(moviesService, 'get')
      .and.returnValue(of(mockMovies));
    });
    
    it('should get value form service', () => {      
      component.ngOnInit();
      
      expect(getMovieSerSpy).toHaveBeenCalled();
      expect(getMovieSerSpy).toHaveBeenCalledTimes(1);
      
      expect(listMovieSCompSpy).toHaveBeenCalled()
      expect(listMovieSCompSpy).toHaveBeenCalledTimes(1)
      expect(component.movies).toEqual(mockMovies);
    });
    
    
    it('should get value when called listAll funciton', () => {      
      component.listAll();
      
      expect(getMovieSerSpy).toHaveBeenCalled();
      expect(getMovieSerSpy).toHaveBeenCalledTimes(1);
      
      expect(listMovieSCompSpy).toHaveBeenCalled();
      expect(listMovieSCompSpy).toHaveBeenCalledTimes(1);
      expect(component.movies).toEqual(mockMovies);
    });
    
    it('should dispaly values in from template', () => {
      component.ngOnInit();
      // wait for load views
      fixture.detectChanges();
      expect(getMovieSerSpy).toHaveBeenCalled();
      expect(listMovieSCompSpy).toHaveBeenCalled();
      
      let firstMovie = de.query(By.css('.card-header'))
      expect(firstMovie).toBeDefined();
      expect(firstMovie.nativeElement.textContent).toContain(`${mockMovies[0].name} |-> Views: ${mockMovies[0].downloads}`);
    });
    
  });
  
  describe('lists details', () => {
    let deleteMovieSerSpy:any;
    let getMovieSerSpy:any;
    let removeMoviesCompSpy:any;
    let detailsMoviesCompSpy:any;
    let updateMovieSerSpy:any;
    let countDeonalodsMoviesCompSpy:any;
    
    beforeEach(() => {
      removeMoviesCompSpy = spyOn(component, 'remove')
      .and.callThrough();

      detailsMoviesCompSpy = spyOn(component, 'details')
      .and.callThrough();

      countDeonalodsMoviesCompSpy = spyOn(component, 'countDownloads')
      .and.callThrough();
      
      deleteMovieSerSpy = spyOn(moviesService, 'delete')
      .and.returnValue(of([]));
      
      getMovieSerSpy = spyOn(moviesService, 'get')
      .and.returnValue(of(mockMovies));
      
      updateMovieSerSpy = spyOn(moviesService, 'update')
      .and.returnValue(of(mockMovies[1]))
    });

    xit('should hide details after click name', async(() => {
      component.ngOnInit();
      // wait for load views
      fixture.detectChanges(); 
      let movieList = de.queryAll(By.css('.movie'));
      
      for (const index in movieList) {
        let movie = movieList[index];
        // Display only details
        if(mockMovies[index].details) {

          expect(movie.query(By.css('.movie-name-link')).nativeElement.textContent)
          .toEqual(` ${mockMovies[index].name} |-> Views: ${mockMovies[index].downloads}`);
       
        }
        else {
          console.log('false',);
          
          // expect(movie.children.find(By.css('.movie-details'))).toBeDefined();
          // let movieNamLink:HTMLElement = movie.children.find(By.css('.movie-name-link')).nativeElement;
          // movieNamLink.click();
          
          // fixture.checkNoChanges();
          // let movieDetailsView = movie.children.find(By.css('.movie-name-link'));
          // expect(movieDetailsView).toBeUndefined();         
        }
      }
       
    }));

    it('should display details', () => {
      component.ngOnInit();
      // wait for load views
      fixture.detectChanges(); 
      let movieList = de.queryAll(By.css('.movie'));
      
      for (const index in movieList) {
        let movie = movieList[index];
        // Display only details
        if(mockMovies[index].details) {
          expect(movie.query(By.css('.movie-name-link'))).toBeDefined();
          expect(movie.query(By.css('.movie-name-link')).nativeElement.textContent)
          .toEqual(`${mockMovies[index].name} |-> Views: ${mockMovies[index].downloads}`);
        }
        else {
          expect(movie.query(By.css('movie-details'))).toBeNull();
        }
      }
    });
    
    it('should view Edit Button', () => {      
      component.ngOnInit();
      // wait for load views
      fixture.detectChanges();
      
      let button = de.query(By.css('#movie1 .editBtn')).nativeElement;
      expect(button).toBeDefined();
      expect(button.textContent).toEqual(' Edit ');
      expect(button.getAttribute('id')).toEqual(`movieEditBtn${mockMovies[0].id}`);
    });
    
    it('should view Delete Button', () => {      
      component.ngOnInit();
      // wait for load views
      fixture.detectChanges();
      
      let button = de.query(By.css('#movie1 .removeBtn')).nativeElement;
      expect(button).toBeDefined();
      expect(button.textContent).toEqual(' Remove ');
      expect(button.getAttribute('id')).toEqual(`movieRmBtn${mockMovies[0].id}`);
    });
    
    it('should Delete Button functionality', () => {
      component.ngOnInit();
      // wait for load views
      fixture.detectChanges();
      
      let removeBtn = de.query(By.css('#movie1 .removeBtn')).nativeElement;      
      removeBtn.click();
      fixture.detectChanges(); 
      
      expect(removeMoviesCompSpy).toHaveBeenCalled();
      expect(removeMoviesCompSpy).toHaveBeenCalledWith(mockMovies[0]);
      expect(removeMoviesCompSpy).not.toHaveBeenCalledWith({});
      expect(removeMoviesCompSpy).toHaveBeenCalledTimes(1);
      
      // expect(getMovieSerSpy).toHaveBeenCalled();
      // expect(getMovieSerSpy).toHaveBeenCalledTimes(1);

      expect(deleteMovieSerSpy).toHaveBeenCalled();
      expect(deleteMovieSerSpy).toHaveBeenCalledTimes(1);
      expect(deleteMovieSerSpy).toHaveBeenCalledWith(mockMovies[0].id);
      expect(deleteMovieSerSpy).not.toHaveBeenCalledWith();
      expect(deleteMovieSerSpy).not.toHaveBeenCalledWith('');
      expect(deleteMovieSerSpy).not.toHaveBeenCalledWith(`${mockMovies[0].id}`);
    });

    it('should funciton details', () => {
      component.details(mockMovies[0]);
      expect(countDeonalodsMoviesCompSpy).not.toHaveBeenCalled();

      component.details(mockMovies[1]);
      expect(countDeonalodsMoviesCompSpy).toHaveBeenCalled();
      expect(countDeonalodsMoviesCompSpy).toHaveBeenCalledWith(mockMovies[1]);
      expect(updateMovieSerSpy).toHaveBeenCalled();
      expect(updateMovieSerSpy).toHaveBeenCalledTimes(1);
      
    });
  });

});
