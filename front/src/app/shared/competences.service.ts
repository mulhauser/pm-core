import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CompetencesService {

  private _backendURL: any;

  constructor(private http: HttpClient) {
     this._backendURL = {};
     // build backend base url
     let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
     if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
     // build all backend urls
     Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  getCompetences(): Observable<any> {
    return this.http.get(this._backendURL.allCompetences, this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  deleteCompetence(idCand: any , id: any): Observable<any> {
    return this.http.delete(this._backendURL.deleteCandidatCompetence.replace(':id', idCand).replace(':idCompetence', id), this._backendURL);
  }

  private _options(headerList: Object = {}): any {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, {'Authorization': 'Bearer '+currentUser.token}, headerList));
    return { headers };
  }

}
