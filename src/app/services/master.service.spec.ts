import { TestBed, async } from '@angular/core/testing';

import { MasterService } from './master.service';
import { Movie } from '../interfaces/movie';
import { of } from 'rxjs';
import { ExpectedConditions } from 'protractor';

describe('MasterService', () => {
  let service: MasterService;
  const type = "movies"; 
  let ajaxUrl:string;
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy, post: jasmine.Spy,   };
  const mockMovies : Movie[] = [
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

  beforeEach(() => TestBed.configureTestingModule({}));
      
  beforeEach(() => { 
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete', 'post']);
    service =  new MasterService(<any> httpClientSpy, type);
  });  
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected movies (HttpClient called once)', () => {
    const expectedMovies: Movie[] = mockMovies;
   
    httpClientSpy.get.and.returnValues(of(expectedMovies));
   
    service.get().subscribe(
      movies => expect(movies).toEqual(expectedMovies, 'expected movies'),
      fail
    );
    let submitUrl = `${service.ajaxUrl}`
    expect(httpClientSpy.get).toHaveBeenCalledWith(submitUrl);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected movie (HttpClient called once)', () => {
    const expectedMovie: Movie = mockMovies[0];
   
    httpClientSpy.get.and.returnValues(of(expectedMovie));
   
    service.get(expectedMovie.id).subscribe(
      movies => expect(movies).toEqual(expectedMovie, 'expected movies'),
      fail
    );
    let submitUrl = `${service.ajaxUrl}/${expectedMovie.id}`
    expect(httpClientSpy.get).toHaveBeenCalledWith(submitUrl);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should add movie (HttpClient called once)', () => {
    const expectedMovie: Movie = mockMovies[0];
   
    httpClientSpy.post.and.returnValue(of(expectedMovie));
   
    service.add(mockMovies[0]).subscribe(
      movie => expect(movie).toEqual(expectedMovie, 'expected movie'),
      fail
    );
    let submitUrl = `${service.ajaxUrl}`
    expect(httpClientSpy.post).toHaveBeenCalledWith( submitUrl, expectedMovie);
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should update movie (HttpClient called once)', () => {
    const expectedMovie: Movie = mockMovies[0];
   
    httpClientSpy.put.and.returnValue(of(expectedMovie));
   
    service.update(mockMovies[0]).subscribe(
      movie => expect(movie).toEqual(expectedMovie, 'expected movie'),
      fail
    );
    let submitUrl = `${service.ajaxUrl}/${expectedMovie.id}`
    expect(httpClientSpy.put)
    .toHaveBeenCalledWith( submitUrl, expectedMovie);

    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should delete selected movie (HttpClient called once)', () => {
    const expectedMovie: Movie = mockMovies[0];
    service.delete(expectedMovie.id);
    expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
  });

});
