import { Component, OnInit } from '@angular/core';
import {CompetencesService} from '../shared/competences.service';
import {Observable} from 'rxjs/Observable';
import {Competence} from "../_models/competence";

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
  }

  get competences(): Competence[]{
      return this._competences;
  }

 // private _add(competence: any): Observable<any[]> {
  //  return this._competenceService.addPeople(people).flatMap(_ => this._getAll());
 // }

  private _getAll(): Observable<any[]> {
    return this._competenceService.getCompetences()
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }
}
