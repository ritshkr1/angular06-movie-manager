import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

import {  appConfig  } from '../config/globel.conf'
import { Movie } from '../interfaces/movie';

@Injectable()
export class MoviesService {
  ajaxUrl:string;
  ref:any;
  constructor() {
     
    this.ref = firebase.firestore().collection('movies');
  }
    
  // Post data
  add(formData) {
    return new Observable((observer) => {
      this.ref.add(formData).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }  
  
  // List all 
  getAll() {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let movies = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          movies.push({
            id: doc.id,
            name: data.name,
            path: data.path,
            quality: data.quality,
            details: data.details,
            downloads: data.downloads
          });
        });
        observer.next(movies);
      });
    });
  }  

  get(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          id: doc.id,
          name: data.name,
          path: data.path,
          quality: data.quality,
          details: data.details,
          downloads: data.downloads
        });
      });
    });
  }

  // Update data
  update(id, formData:Movie) {
    return new Observable((observer) => {
      this.ref.doc(id).set(formData).then(() => {
        observer.next();
      });
    });
  }     
  
  // Delete data
  delete(id: Number) {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }  
  
}