import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {CandidatService} from '../shared/candidat.service';
import {RecruteurService} from '../shared/recruteur.service';
import {Observable} from 'rxjs/Observable';
import {ModalInscriptionCandidatComponent} from '../shared/modal-inscription-candidat/modal-inscription-candidat.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  // private property to store dialogStatus value
  private _dialogStatus: string;
  // on stock le candidat qui va s'inscrire ici
  private _candidat: {};
  constructor(private _eventsDialog: NgbModal, private http: HttpClient,
              private _candidatService: CandidatService,
              private _recruteurService: RecruteurService) {
  }

  ngOnInit() {
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * ouvre le popup pour l'inscription d'un candidat
   */
  showDialogInscriptionCandidat() {
// set dialog status
    this._dialogStatus = 'active';
    // open modal
    const dialogRef = this._eventsDialog.open(ModalInscriptionCandidatComponent, {
      size: 'lg',
      keyboard: true,
      backdrop: 'static'
    });
    dialogRef.result.then(
      (result) => {
        this._inscriptionCandidat(result.value)
          .subscribe(
            (infoCandidat: any) => this._candidat = infoCandidat,
            () => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
          );
      }, (reason) => {
        this._dialogStatus = 'inactive';
      }
    );
  }

  showDialogInscriptionRecruteur() {

  }

  /**
   * fonction servant à inscrire le candidat
   * fait un appel au service pour l'add
   * @param candidat
   * @returns {Observable<any[]>}
   * @private
   */
  private _inscriptionCandidat(candidat): Observable<any[]> {
    return this._candidatService.addCandidat(candidat).flatMap(_ => this._candidatService.getCandidatDetails(candidat.id));
  }
}
