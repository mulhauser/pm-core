import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class RecruteurService {

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


  getRecruteurByEmail(email: string): Observable<any> {
    return this.http.get(this._backendURL.getRecruteurByEmail.replace(':email', email), this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  getRecruteurById(id: number): Observable<any> {
    return this.http.get(this._backendURL.getRecruteurById.replace(':id', id), this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  getAll(): Observable<any> {
    return this.http.get(this._backendURL.allRecruteur, this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }



  addRecruteurOffre(id: number, offre: any): Observable<any> {
    return this.http.post(this._backendURL.addOffreToRecruteur.replace(':id', id), offre, this._options());
  }

  gerRecruteurOffres(id: number): Observable<any> {
    return this.http.get(this._backendURL.getOffresByRecruteur.replace(':id', id), this._options());
  }

  updateRecruteur (recruteur: any): Observable<any> {
    return this.http.put(this._backendURL.updateRecruteur, recruteur, this._options());
  }

  deleteRecruteur(recruteur: any): Observable<any> {
    return this.http.delete(this._backendURL.deleteRecruteur, recruteur);
  }


  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers,
      responseType: 'text' };
  }
}

