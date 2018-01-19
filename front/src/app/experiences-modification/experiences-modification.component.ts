import {Component, Input, OnInit} from '@angular/core';
import {ExperienceService} from '../shared/experience.service';
import {AlertService} from '../_services/alert.service';

@Component({
  selector: 'app-experiences-modification',
  templateUrl: './experiences-modification.component.html',
  styleUrls: ['./experiences-modification.component.css']
})
export class ExperiencesModificationComponent implements OnInit {

  private _experience: any = {};

  constructor(private _experienceService: ExperienceService, private alertService: AlertService) { }

  ngOnInit() {
  }

  get experience(): any {
    return this._experience;
  }

  @Input('experienceUpdate')
  set experience(value: any) {
    this._experience = value;
  }

  update() {
    this._experienceService.updateExperience(this._experience).subscribe( _ =>
      this.alertService.success('Modifications effectuées', true)
    );
  }




}
