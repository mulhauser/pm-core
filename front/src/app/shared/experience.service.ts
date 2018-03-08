import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ExperienceService {

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

  getExperiences(): Observable<any> {
    return this.http.get(this._backendURL.allExperiences, this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  updateExperience(idCand: number, experience: any): Observable<any> {
    return this.http.put(this._backendURL.updateExperience.replace(':id', idCand), experience, this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  deleteExperience(id: any): Observable<any> {
    return this.http.delete(this._backendURL.deleteExperience.replace(':id', id), this._backendURL);
  }

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers };
  }

}
