import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { RouterTestingModule, setupTestingRouter} from '@angular/router/testing';

import { EditMovieComponent } from './edit-movie.component';
import { MoviesService } from 'src/app/services/movies.service';
import { QualitiesService } from 'src/app/services/qualities.service';
import { Movie } from 'src/app/interfaces/movie';
import { Quality } from 'src/app/interfaces/quality';

describe('EditMovieComponent', () => {
  let component: EditMovieComponent;
  let fixture: ComponentFixture<EditMovieComponent>;
  let de: DebugElement;
  let moviesService: MoviesService;
  let qualitiesService: QualitiesService;
  let router;
  let mockMovie:Movie;
  let mockQualities:Quality[];
  let updateMovieSerSpy;
  let getMovieSerSpy;
  let editMovieCompSpy;
  let mockInitMovie:Movie =  { 
    path: '',
    quality: '',
    name: '',
    downloads: 0 
  };

  beforeEach(() => {
    router = {
      navigate: jasmine.createSpy('navigate'),    // to spy on the url that has been routed
      path: jasmine.createSpy('movies')
    };

    TestBed.configureTestingModule({
      declarations: [ EditMovieComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers:[
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        },
        MoviesService,
        QualitiesService, 
      ]
    })
    .compileComponents();

    mockMovie = {
      path:"path1",
      quality:'720px',
      name:'film1',
      downloads:0
    }

    mockQualities = [
      { quality: '720px' },
      { quality: '1080px' }
  ];
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;    
    fixture.detectChanges();
    moviesService =  TestBed.get(MoviesService);
    qualitiesService =  TestBed.get(QualitiesService);
  });

  beforeEach(() => {
    updateMovieSerSpy = spyOn(moviesService, 'update')
    .and.returnValue(of(mockMovie)); 

    getMovieSerSpy = spyOn(moviesService, 'get')
    .and.returnValue(of(mockMovie));

    editMovieCompSpy = spyOn(component, 'editMovie')
    .and.callThrough();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set movie default values', () => {
    expect(component.movie)
    .toEqual(mockInitMovie);
  });
 

  it('should set qualities default values', fakeAsync(() => {
    let getQualitiesSpy = spyOn(qualitiesService, 'get')
    .and.returnValue(of(mockQualities));  
    expect(component.qualities).toEqual([]);
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.qualities).not.toEqual([]);
    expect(component.qualities.length).toEqual(2);
  }));

  it('should save movie redirect to movies', async(() => {
    component.movie = mockMovie;
    component.qualities = mockQualities;
    fixture.detectChanges();

    component.editMovie();
    expect(updateMovieSerSpy).toHaveBeenCalled();
    expect(updateMovieSerSpy).toHaveBeenCalledWith(mockMovie);
    expect(updateMovieSerSpy).toHaveBeenCalledTimes(1);

    expect(router.navigate).toHaveBeenCalledWith(['movies']);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  }));

  it('should submit the form values', () => {
    expect(component.movie).toEqual(mockInitMovie);
    component.ngOnInit();
    fixture.detectChanges();
    component.qualities = mockQualities; 
    component.movie = mockMovie; 
    const button = de.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    
    expect(updateMovieSerSpy).toHaveBeenCalledWith(mockMovie);
    expect(updateMovieSerSpy).toHaveBeenCalledTimes(1);

    expect(editMovieCompSpy).toHaveBeenCalled()
    expect(component.movie).not.toEqual(mockInitMovie);
    expect(component.movie).toEqual(mockMovie);
  });

});
