import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CandidatService} from '../candidat.service';

@Component({
  selector: 'app-form-inscription-candidat',
  templateUrl: './form-inscription-candidat.component.html',
  styleUrls: ['./form-inscription-candidat.component.css']
})
export class FormInscriptionCandidatComponent implements OnInit {


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


  verificationEmailExists(email) {
    console.log(email);
    if (this._candidatService.getEmail(email)) {
      console.log('match fount');
    }
  }

}
