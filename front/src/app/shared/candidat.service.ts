import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {CandidatComponent} from '../candidat/candidat.component';
import {environment} from '../../environments/environment';

@Injectable()
export class CandidatService {

  /**
   * J'AI CHOISI DE RETOURNER DES OBSERVABLE ANY AU LIEN DE CANDIDATMODEL
   * ON POURRA APRES SI ON VEUT MAIS ON SE FAIT PAS CHIER AVEC LE TYPAGE COMME ÇA
   * @type {string}
   */
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


  getCandidatByEmail(email: string): Observable<any> {
    return this.http.get(this._backendURL.getCandidatByEmail.replace(':email', email), this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  getCandidatById(id: number): Observable<any> {
    return this.http.get(this._backendURL.getCandidatById.replace(':id', id), this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  getAll(): Observable<any> {
    return this.http.get(this._backendURL.allCandidat, this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  getBestOffres(email: string){
    return this.http.get(this._backendURL.getBestOffresByCandidat.replace(':id', email), this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([])
  }

  getCandidatExperiences(id: number): Observable<any> {
    return this.http.get(this._backendURL.getCandidatExperiences.replace(':id', id), this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  getCandidatCompetences(id: number): Observable<any> {
    return this.http.get(this._backendURL.getCandidatCompetences.replace(':id', id), this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  addCandidatExperience(experience: any, id: number): Observable<any> {
    return this.http.post(this._backendURL.addCandidatExperience.replace(':id', id), experience, this._options());
  }

  addCandidatCompetence(competence: any, id: string, idCompetence: string): Observable<any> {
    return this.http.post(this._backendURL.addCandidatCompetence.replace(':id', id).replace(':idCompetence', idCompetence), this._options());
  }

  suspendreCandidat(id: number): Observable<any> {
    return this.http.put(this._backendURL.suspendreCandidat.replace(':id', id), this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  supprimerCandidat(id: number) {
    return this.http.delete(this._backendURL.deleteCandidat.replace(':id', id));
  }


  updateCandidat (candidat: any): Observable<any> {
    return this.http.put(this._backendURL.updateCandidat, candidat, this._options());
  }

  deleteCandidat(candidat: any): Observable<any> {
    return this.http.delete(this._backendURL.deleteCandidat, candidat);
  }

  postulerOffre(offre: any, id: string): Observable<any> {
    return this.http.post(this._backendURL.postulerOffre.replace(':id', id), offre, this._options());
  }

  getCandidatMatch(id: string,exp: boolean): Observable<any> {
    return this.http.get(this._backendURL.getCandidatMatch.replace(':id', id).replace(':bool',exp), this._options());
  }

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers, observe: 'response',
      responseType: 'text' };
  }
}

