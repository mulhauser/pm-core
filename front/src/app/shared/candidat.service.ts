import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CandidatModel} from '../candidat/candidat.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const jSonOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class CandidatService {

  /**
   * J'AI CHOISI DE RETOURNER DES OBSERVABLE ANY AU LIEN DE CANDIDATMODEL
   * ON POURRA APRES SI ON VEUT MAIS ON SE FAIT PAS CHIER AVEC LE TYPAGE COMME ÇA
   * @type {string}
   */
  private candidatUrl = 'api/candidats';

  constructor(private http: HttpClient) { }

  addCandidat(candidat: CandidatModel): Observable<any> {
    return this.http.post<CandidatModel>(this.candidatUrl, candidat, jSonOptions);
  }

  getCandidatDetails(id: string): Observable<any> {
    const url = `${this.candidatUrl}/${id}`;
    return this.http.get<CandidatModel>(url)
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  deleteCandidat(candidat: CandidatModel ): Observable<any> {
    const id = +candidat.id;
    const url = `${this.candidatUrl}/${id}`;

    return this.http.delete<CandidatModel>(url, jSonOptions)
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  updateEvent (candidat: CandidatModel): Observable<any> {
    return this.http.put(this.candidatUrl, event, jSonOptions);
  }

  getCandidats(): Observable<any> {
    return this.http.get<CandidatModel[]>(this.candidatUrl)
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }


}
