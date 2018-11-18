import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditMovieComponent } from './edit-movie.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpModule } from '@angular/http';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { MoviesService } from 'src/app/services/movies.service';
import { QualitiesService } from 'src/app/services/qualities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { Quality } from 'src/app/interfaces/quality';

xdescribe('EditMovieComponent', () => {
  let component: EditMovieComponent;
  let fixture: ComponentFixture<EditMovieComponent>;
  let de: DebugElement;
  let moviesService: MoviesService;
  let qualitiesService: QualitiesService;
  let router = {
    navigate: jasmine.createSpy('navigate'),    // to spy on the url that has been routed
  };
  let mockMovie:Movie;
  let mockQuality:Quality[];
  let mockInitMovie:Movie =  { 
    path: '',
    quality: '',
    name: '',
    downloads: 0 
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMovieComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpModule
      ],
      providers:[
        MoviesService,
        QualitiesService, 
        {provide: Router, useValue: router}
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
    fixture = TestBed.createComponent(EditMovieComponent);
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
    
    component.editMovie();
    
    expect(mockAddMovieSpy).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith(['movies']);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  it('should submit the form values', () => {
    expect(component.movie).toEqual(mockInitMovie);
    component.movie = mockMovie;
    
    let addMovieCompSpy = spyOn(component, 'editMovie')
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
