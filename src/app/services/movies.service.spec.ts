import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { MasterService } from './master.service';

describe('MoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[MasterService]
  }));

  xit('should be created', () => {
    // const service = new MasterService();
    // // const masterService: MoviesService = TestBed.get(MasterService);
    // expect(service).toBeTruthy();
  });
  
});
