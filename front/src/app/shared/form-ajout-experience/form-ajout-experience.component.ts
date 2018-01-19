import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CandidatService} from '../candidat.service';

@Component({
  selector: 'app-form-ajout-experience',
  templateUrl: './form-ajout-experience.component.html',
  styleUrls: ['./form-ajout-experience.component.css']
})
export class FormAjoutExperienceComponent implements OnInit {

  private _cancel$: EventEmitter<any>;
  private _submit$: EventEmitter<any>;
  private _isUpdateMode: boolean;
  private _model: any = {};

  constructor(private _candidatService: CandidatService) {
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
  }





}
