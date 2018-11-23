import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

import {  appConfig  } from '../config/globel.conf'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QualitiesService {
  ajaxUrl:string;
  ref:any;
  constructor() {
    this.ref = firebase.firestore().collection('qualities');
  }
    
  // Post data
  add(formData) {
    return new Observable((observer) => {
      this.ref.add(formData).then((doc) => {
        observer.next({
          id: doc.id,
        });
      });
    });
  }  
  
  // List all 
  getAll() {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let qualities = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          qualities.push({
            id: doc.id,
            quality: data.quality
          });
        });
        observer.next(qualities);
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
          path: data.path
        });
      });
    });
  }


  
  // Update data
  update(formData) {      
    return new Observable((observer) => {
      this.ref.doc(formData.id).set(formData).then(() => {
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