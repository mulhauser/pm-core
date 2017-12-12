import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CandidatModel} from '../candidat/candidat.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {CandidatComponent} from '../candidat/candidat.component';

const jSonOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class CandidatService {

  /**
   * J'AI CHOISI DE RETOURNER DES OBSERVABLE ANY AU LIEN DE CANDIDATMODEL
   * ON POURRA APRES SI ON VEUT MAIS ON SE FAIT PAS CHIER AVEC LE TYPAGE COMME ÇA
   * @type {string}
   */
  private candidatUrl = 'api/candidats';
  private emailPotentiel: any;
  private _candidats: any[];

  constructor(private http: HttpClient) {
    this._candidats = [];
  }

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

  updateCandidat (candidat: CandidatModel): Observable<any> {
    return this.http.put(this.candidatUrl, event, jSonOptions);
  }

  getCandidats(): Observable<any> {
    return this.http.get<CandidatModel[]>(this.candidatUrl)
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  getEmailPourVerification(infosMail: string): boolean {
    this.getCandidats()
      .subscribe((candidats: any[]) => this._candidats = candidats);
    for (let i = 0; i < this._candidats.length; i++) {
      if (this._candidats[i].email === infosMail) {
        // console.log('Match fond email not valid');
        return true;
      }
    }
    return false;
  }
}

