import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

import {  appConfig  } from '../config/globel.conf'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MasterService {
  ajaxUrl:string;
  ref:any;
  constructor(private http: HttpClient, protected endPoint:string) {
     
    this.ref = firebase.firestore().collection(endPoint);
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
        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          console.log('data',data);
          boards.push({
            key: doc.id,
            name: data.name,
            path: data.path
          });
        });
        console.log('boards',boards);
        observer.next(boards);
      });
    });
  }  

  get(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
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