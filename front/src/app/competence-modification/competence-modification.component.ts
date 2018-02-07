import {Component, Input, OnInit} from '@angular/core';
import {CompetencesService} from '../shared/competences.service';
import {AlertService} from '../_services/alert.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-competence-modification',
  templateUrl: './competence-modification.component.html',
  styleUrls: ['./competence-modification.component.css']
})
export class CompetenceModificationComponent implements OnInit {


  private _competence: any = {};
  private _currentCandidat: any = {};

  constructor(private _competenceService: CompetencesService, private alertService: AlertService, private datePipe: DatePipe) { }

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
    this._competenceService.deleteCompetence(this._competence.id).subscribe( _ => {
        this.alertService.success('Supprimer ! ', true); },
      error => window.location.reload()
    );
  }
}
