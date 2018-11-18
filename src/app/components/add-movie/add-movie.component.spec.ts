import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AddMovieComponent } from './add-movie.component';
import { MoviesService } from 'src/app/services/movies.service';
import { QualitiesService } from 'src/app/services/qualities.service';
import { Movie } from 'src/app/interfaces/movie';
import { Quality } from 'src/app/interfaces/quality';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let de: DebugElement;
  let moviesService: MoviesService;
  let qualitiesService: QualitiesService;
  let router;
  let mockMovie:Movie;
  let mockQuality:Quality[];
  let mockInitMovie:Movie =  { 
    path: '',
    quality: '',
    name: '',
    downloads: 0 
  };

  beforeEach(async(() => {
    router = {
      navigate: jasmine.createSpy('navigate'),    // to spy on the url that has been routed
    };

    TestBed.configureTestingModule({
      declarations: [ AddMovieComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers:[
        MoviesService,
        QualitiesService, 
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    mockMovie = {
      path:"path1",
      quality:'720px',
      name:'film1',
      downloads:0
    } 

    mockQuality = [
      { quality: '720px' },
      { quality: '1080px' }
  ];
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;    
    fixture.detectChanges();
    moviesService =  TestBed.get(MoviesService);
    qualitiesService =  TestBed.get(QualitiesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set movie default values', () => {
    expect(component.movie)
    .toEqual(mockInitMovie);
  });

  it('should set qualities default values', fakeAsync(() => {
    let getQualitiesSpy = spyOn(qualitiesService, 'get')
    .and.returnValue(of(mockQuality));  
    expect(component.qualities).toEqual([]);
    component.ngOnInit();
    tick(1000);
    expect(component.qualities).not.toEqual([]);
    expect(component.qualities.length).toEqual(2);
  }));

  it('should save movie redirect to movies', () => {
    component.movie = mockMovie;
    let mockAddMovieSpy = spyOn(moviesService, 'add')
    .and.returnValue(of(mockMovie));    
    
    component.addMovie();
    
    expect(mockAddMovieSpy).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith(['movies']);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  it('should submit the form values', () => {
    expect(component.movie).toEqual(mockInitMovie);
    component.movie = mockMovie;
    
    let addMovieCompSpy = spyOn(component, 'addMovie')
    .and.callThrough();
    let addMovieSerSpy = spyOn(moviesService, 'add')
    .and.returnValue(of(mockMovie));
    
    const button = de.query(By.css('button')).nativeElement;
    button.click();
    
    expect(addMovieSerSpy).toHaveBeenCalledWith(mockMovie);
    expect(addMovieSerSpy).toHaveBeenCalledTimes(1);

    expect(addMovieCompSpy).toHaveBeenCalled()
    expect(component.movie).not.toEqual(mockInitMovie);
    expect(component.movie).toEqual(mockMovie);
  });

});
