import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Offre} from '../_models/offre';

@Injectable()
export class OffreService {

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

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList));
    return {headers};
  }

  /** Getter function who return an observable of the offres
   *
   * @returns {Observable<any>}
   */
  getOffres(): Observable<any> {
    return this.http.get(this._backendURL.allOffres, this._options())
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }


  getOffreDetails(id: string): Observable<any> {
    return this.http.get(this._backendURL.oneOffre.replace(':id', id), this._options())
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }

  setSuspendreOffre(id: number): Observable<any> {
    return this.http.put(this._backendURL.suspendreOffre.replace(':id', id),  this._options())
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }

  updateOffre(id: number): Observable<any> {
    return this.http.put(this._backendURL.updateOffresByRecruteur.replace(':id', id), this._options());
  }



  /*

    getOffres(): Observable<any> {
      return this.http.get<Offre[]>(this.offresUrl)
        .filter( _ => !!_)
        .defaultIfEmpty([]);
    }



    getOffreDetails(id: string): Observable<any> {
          const url = `${this.offresUrl}/${id}`;
          return this.http.get<Offre>(url)
             .filter( _ => !!_)
            .defaultIfEmpty([]);
        }
  */

}
