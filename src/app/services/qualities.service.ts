import { Injectable } from '@angular/core';
import { Http } from '@angular/http';  
import { MasterService } from './master.service';



@Injectable()
export class QualitiesService extends MasterService {

    constructor(http:Http) { 
      super(http,  "qualities");
    }

}