import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, pipe} from 'rxjs';
import { map } from 'rxjs/operators';

import {  appConfig  } from '../config/globel.conf'

const hostUrl = `${appConfig.company.host.protocol}://${appConfig.company.host.url}:${appConfig.company.host.port}/movies`;

@Injectable()
export class MoviesService {

    constructor(private http: Http) { }

    // List all 
    getAll() {        
        // ...using get request
        return this.http.get(hostUrl)
        // ...and calling .json() on the response to return data
        .pipe(map((res: Response) => res.json()));
    }  
    
}