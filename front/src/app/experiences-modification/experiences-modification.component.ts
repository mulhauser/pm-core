import {Component, Input, OnInit} from '@angular/core';
import {ExperienceService} from '../shared/experience.service';
import {AlertService} from '../_services/alert.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-experiences-modification',
  templateUrl: './experiences-modification.component.html',
  styleUrls: ['./experiences-modification.component.css']
})
export class ExperiencesModificationComponent implements OnInit {

  private _experience: any = {};
  private _currentCandidat: any = {};

  constructor(private _experienceService: ExperienceService, private alertService: AlertService, private datePipe: DatePipe)  { }

  ngOnInit() {
  }

  get experience(): any {
    return this._experience;
  }

  @Input('experienceUpdate')
  set experience(value: any) {
    this._experience = value;
    this._experience.dateDebut = this.datePipe.transform(value.dateDebut, 'yyyy-MM-dd');
    this._experience.dateFin = this.datePipe.transform(value.dateFin, 'yyyy-MM-dd');


  }

  @Input('currentCandidat')
  set currentCandidat(value: any) {
    this._currentCandidat = value;
  }

  update() {
    this._experienceService.updateExperience(this._experience).subscribe( _ =>
      this.alertService.success('Modifications effectuées', true)
    );
  }

  supprimer() {
    this._experienceService.deleteExperience(this._experience.id).subscribe( _ => {
      this.alertService.success('Supprimer ! ', true); },
      error => window.location.reload()
    );
  }

}
