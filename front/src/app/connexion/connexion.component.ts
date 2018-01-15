import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CandidatService} from "../shared/candidat.service";
import {RecruteurService} from "../shared/recruteur.service";
import {HttpClient} from "@angular/common/http";
import {ModalConnexionCandidatComponent} from "../shared/modal-connexion-candidat/modal-connexion-candidat.component";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  // private property to store dialogStatus value
  private _dialogStatus: string;
  // on stock le candidat qui va se connecter ici
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
   * ouvre le popup pour la connexion d'un candidat
   */
  showDialogConnexionCandidat() {
// set dialog status
    this._dialogStatus = 'active';
    // open modal
    const dialogRef = this._eventsDialog.open(ModalConnexionCandidatComponent, {
      size: 'lg',
      keyboard: true,
      backdrop: 'static'
    });
    dialogRef.result.then(
      (result) => {
        this._connexionCandidat(result.value)
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

  showDialogConnexionRecruteur() {

  }

  /**
   * fonction servant à connecter le candidat
   * fait un appel au service pour l'add
   * @param candidat
   * @returns {Observable<any[]>}
   * @private
   */
  private _connexionCandidat(candidat): Observable<any[]> {
    return null;
  }

}
