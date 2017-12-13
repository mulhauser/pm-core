import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CandidatModel} from '../candidat/candidat.model';

@Injectable()
export class CandidatService {

  constructor() { }

   addCandidat(candidat: any): Observable<any[]> {
     return new Observable<any[]>();
   }

  getCandidatDetails(id: string): Observable<any[]> {
    return new Observable<any[]>();
  }


}
