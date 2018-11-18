import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';

import {  appConfig  } from '../config/globel.conf'
import { HttpClient } from '@angular/common/http';

const hostUrl = `${appConfig.company.host.protocol}://${appConfig.company.host.url}:${appConfig.company.host.port}`;

@Injectable()
export class MasterService {
  ajaxUrl:string;
  
  constructor(private http: HttpClient, protected endPoint:string) {
    this.ajaxUrl = `${hostUrl}/${this.endPoint}`;
  }
  
  // ngOnInit(): void {}
  
  // Post data
  add(formData) {
    return this.http.post(this.ajaxUrl, formData);
  }  
  
  // List all 
  get(id=null) {
    let getUrl:string = this.ajaxUrl;
    if (id!=null) {
      getUrl = `${this.ajaxUrl}/${id}`;
    }
    
    return this.http.get(getUrl);
  }  
  
  // Update data
  update(formData) {      
    let updateUrl = `${this.ajaxUrl}/${formData.id}`
    return this.http.put(updateUrl, formData);
  }     
  
  // Delete data
  delete(id: Number) {
    let deleteUrl = `${this.ajaxUrl}/${id}`
    return this.http.delete(deleteUrl);
  }  
  
}