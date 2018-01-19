import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validator';

@Component({
  selector: 'app-form-connexion-candidat',
  templateUrl: './form-connexion-candidat.component.html',
  styleUrls: ['./form-connexion-candidat.component.css']
})
export class FormConnexionCandidatComponent implements OnInit {


  private _cancel$: EventEmitter<any>;
  private _submit$: EventEmitter<any>;
  private _isUpdateMode: boolean;
  private _model: any = {};
  private _form: FormGroup;

  constructor() {
    this._submit$ = new EventEmitter();
    this._cancel$ = new EventEmitter();
    this._form = this._buildForm();
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

  /**
   * Returns private property _form
   *
   * @returns {FormGroup}
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Function to build our form
   *
   * @returns {FormGroup}
   *
   * @private
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.emailAddr
      ]))
    });
  }

}
