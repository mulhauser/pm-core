import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-modal-inscription-candidat',
  templateUrl: './modal-inscription-candidat.component.html',
  styleUrls: ['./modal-inscription-candidat.component.css']
})
export class ModalInscriptionCandidatComponent implements OnInit {

  private _data: any;

  constructor(private _activeModal: NgbActiveModal) { }

  ngOnInit() {
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
  }
}
