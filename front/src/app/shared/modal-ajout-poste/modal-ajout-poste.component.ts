import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-modal-ajout-poste',
  templateUrl: './modal-ajout-poste.component.html',
  styleUrls: ['./modal-ajout-poste.component.css']
})
export class ModalAjoutPosteComponent implements OnInit {

  private _data: any;

  constructor(private _activeModal: NgbActiveModal, private _router: Router) { }

  ngOnInit() {
    if ( isNullOrUndefined(this._data)) {
      this._data = {};
    }
  }


  /**
   * set the input var named data
   * @param data
   */
  @Input('data')
  set data(data: any) {
    this._data = data;
  }

  /**
   * function get which return the parameter data
   * @returns {any}
   */
  get data() {
    return this._data;
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._activeModal.dismiss();
  }

  /**
   * Function to close the modal and send event back to parent
   * @param event
   */
  onSave(event: any) {
    this._activeModal.close(Observable.of(event));
    this._router.navigate(['recruteur']);
  }

}
