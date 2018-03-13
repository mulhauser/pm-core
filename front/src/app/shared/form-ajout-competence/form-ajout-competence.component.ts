import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompetencesService} from '../competences.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-form-ajout-competence',
  templateUrl: './form-ajout-competence.component.html',
  styleUrls: ['./form-ajout-competence.component.css']
})
export class FormAjoutCompetenceComponent implements OnInit {

  competences = [];

  private _cancel$: EventEmitter<any>;
  private _submit$: EventEmitter<any>;
  private _isUpdateMode: boolean;
  private _model: any = {};

  constructor(private _competenceService: CompetencesService ) {
    this._submit$ = new EventEmitter();
    this._cancel$ = new EventEmitter();
  }


  @Input()
  set model(model: any) {
    this._model = model;
  }

  get model(): any {
    return this._model;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<any> {
    return this._cancel$;
  }


  @Output('submit')
  get submit$(): EventEmitter<any> {
    console.log('result' + this._submit$);
    return this._submit$;
  }

  ngOnChanges(record) {
    if (record.model && record.model.currentValue ) {
      this._isUpdateMode = true;
    } else {
      this._isUpdateMode = false;
    }
  }


  cancel() {
    this._cancel$.emit();
  }

  submit() {
    this._submit$.emit(this._model);
  }

  ngOnInit() {
    this._getAllCompetences().subscribe((competences: any) => this.competences = competences);
    // console.log('competence' + this.competences);
  }

  private _getAllCompetences(): Observable<any[]> {
    return this._competenceService.getCompetences();
  }

}
