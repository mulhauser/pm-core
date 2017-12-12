import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../shared/competences.service';
import {CompetenceModel} from './competence.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit {

  private _competences: any[];

  constructor(private _competenceService: CompetencesService) { }

  ngOnInit() {
    this._getAll().subscribe((competences: any[]) => this._competences = competences);
    console.log(this._competences);
  }

  get competences(): CompetenceModel[]{
      return this._competences;
  }

 // private _add(competence: any): Observable<any[]> {
  //  return this._competenceService.addPeople(people).flatMap(_ => this._getAll());
 // }

  private _getAll(): Observable<any[]> {
    console.log(this._competenceService.getCompetences()
      .filter(_ => !!_)
      .defaultIfEmpty([]));
    return this._competenceService.getCompetences()
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }
}
