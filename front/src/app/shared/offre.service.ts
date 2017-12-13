import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {OffreModel} from '../offre/offre.model';

@Injectable()
export class OffreService {

  private _backendURL: any;
  private offresUrl = 'api/offres';

  constructor(private http: HttpClient) {
    /** A utiliser pour le backend
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
     */
  }

  /**
   * Function to return request options
   *
   * @returns {any}
   */
  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers };
  }
  /** Getter function who return an observable of the offres
   *
   * @returns {Observable<any>}

   A UTILISER QUAND ON EST SUR LE BACKEND
   getOffres(): Observable<any> {s
    return this.http.get(this._backendURL.allOffres, this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }
*/

  getOffres(): Observable<any> {
    return this.http.get<OffreModel[]>(this.offresUrl)
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }
}
