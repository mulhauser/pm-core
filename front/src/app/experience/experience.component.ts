import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ExperienceModel} from './experience.model';
import {ExperienceService} from '../shared/experience.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  private _experiences: ExperienceModel[];

  constructor(private _experienceService: ExperienceService, private http: HttpClient) { }

  ngOnInit() {
    this._experienceService
      .getExperiences()
      .subscribe((experiences: any[]) => this._experiences = experiences);
    // this._getAll().subscribe((experience: any[]) => this._experiences = experience);
    // console.log(this._experiences);
  }

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers };
  }

  get experiences(): ExperienceModel[]{
    return this._experiences;
  }

  // private _add(competence: any): Observable<any[]> {
  //  return this._competenceService.addPeople(people).flatMap(_ => this._getAll());
  // }
}
