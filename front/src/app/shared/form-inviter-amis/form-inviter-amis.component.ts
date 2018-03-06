import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MailService} from '../mail.service';

@Component({
  selector: 'app-form-inviter-amis',
  templateUrl: './form-inviter-amis.component.html',
  styleUrls: ['./form-inviter-amis.component.css']
})
export class FormInviterAmisComponent implements OnInit {

  private _cancel$: EventEmitter<any>;
  private _submit$: EventEmitter<any>;
  private _isUpdateMode: boolean;
  private _email: any;

  constructor(private _mailService: MailService) {
    this._submit$ = new EventEmitter();
    this._cancel$ = new EventEmitter();
  }

  @Input()
  set email(email: any) {
    this._email = email;
  }

  get email(): any {
    return this._email;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<any> {
    return this._cancel$;
  }


  @Output('submit')
  get submit$(): EventEmitter<any> {
    return this._submit$;
  }

  cancel() {
    this._cancel$.emit();
  }

  submit() {
    this._submit$.emit(this._email);
  }

  ngOnInit() {
  }

}
