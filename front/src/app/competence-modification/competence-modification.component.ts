import {Component, Input, OnInit} from '@angular/core';
import {CompetencesService} from '../shared/competences.service';
import {AlertService} from '../_services/alert.service';
import {DatePipe} from '@angular/common';
import {CandidatService} from "../shared/candidat.service";
import {Candidat} from "../_models/candidat";
import {Competence} from "../_models/competence";

@Component({
  selector: 'app-competence-modification',
  templateUrl: './competence-modification.component.html',
  styleUrls: ['./competence-modification.component.css']
})
export class CompetenceModificationComponent implements OnInit {


  private _competence: any = {};
  private _currentCandidat: Candidat;

  constructor(private _candidatService: CandidatService, private _competenceService: CompetencesService, private alertService: AlertService, private datePipe: DatePipe) { }

  ngOnInit() {
  }
  get competence(): any {
    return this._competence;
  }

  @Input('competenceUpdate')
  set competence(value: any) {
    this._competence = value;
  }

  @Input('currentCandidat')
  set currentCandidat(value: any) {
    this._currentCandidat = value;
  }

  supprimer() {
    console.log(this._currentCandidat);
    this._currentCandidat.competences.splice(
      this._currentCandidat.competences
        .findIndex((competence: Competence) => competence.id === this._competence.id),
      1);
    this._candidatService.updateCandidat(this._currentCandidat);
    /*this._competenceService.deleteCompetence(this._competence.id).subscribe( _ => {
        this.alertService.success('Supprimer ! ', true); },
      error => window.location.reload()
    );*/
  }
}
