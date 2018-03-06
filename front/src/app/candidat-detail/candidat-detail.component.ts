import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../_services/user.service';
import {CandidatService} from '../shared/candidat.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {isUndefined} from 'util';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalInviterAmisComponent} from '../shared/modal-inviter-amis/modal-inviter-amis.component';
import {Observable} from 'rxjs/Observable';
import {MailService} from '../shared/mail.service';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.css', '../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class CandidatDetailComponent implements OnInit {


  private currentUser: any;
  private candidat: any;
  private experiences: any;
  private competences: any;
  private _dialogStatus: string;
  private _infoMail: any;




  @Input()
  modeModification = false;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _candidatService: CandidatService,
              private _inviterAmisDialog: NgbModal,
              private _mailService: MailService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    let param: string;
    this._route.paramMap.subscribe(
      params => param = params.get('id')
    );
    if (param) {
      this._candidatService.getCandidatById(parseInt(param, 10))
        .subscribe((data: any) => {
          this.candidat = JSON.parse(data);
        });
    } else {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._candidatService.getCandidatByEmail(this.currentUser.email)
        .subscribe((data: any) => {
          this.candidat = JSON.parse(data);
        });
    }
  }

  userProfil(): boolean {
    let res: boolean;
    res = false;
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!isUndefined(this.candidat)) {
        if (this.candidat.email === this.currentUser.email) {
          res = true;
        }
      }
    }
    return res;
  }

  reload() {
    this._candidatService.getCandidatByEmail(this.currentUser.email)
      .subscribe((data: any) => {
        this.candidat = JSON.parse(data);
      });
  }

  offres() {
    this._candidatService.getBestOffres(this.candidat.id)
      .subscribe((data: any) => {
        this.candidat.offre = JSON.parse(data);
      });
  }

  get candidatDetail(): any {
    return this.candidat;
  }

  get modeModificationOn(): boolean {
    return this.modeModification;
  }

  set modeModificationOn(a: boolean) {
    this.modeModification = a;
  }


  showModalInviterAmis() {
    // set dialog status
    this._dialogStatus = 'active';
    // open modal
    const dialogRef = this._inviterAmisDialog.open(ModalInviterAmisComponent, {
      size: 'sm',
      keyboard: true,
      backdrop: 'static'
    });
    dialogRef.result.then(
      (result) => {
        this._inviterAmis(result.value)
          .subscribe(
            (infoMail: any) => {
              this._infoMail = infoMail; console.log(infoMail);
            },
            () => this._dialogStatus = 'inactive',
            () => {this._dialogStatus = 'inactive';
            }
          );
      }, (reason) => {
        this._dialogStatus = 'inactive';
      }
    );
  }


  private _inviterAmis (email: any): Observable<any> {
    return this._mailService.envoyerInviationEmail(email)
      .flatMap(_ => _);
  }

  /**
   * EBAUCHE DE LA GENERATION DE PDF
   * ATTENTION, IL FAUDRA VOIR CAR TOUS LES CHAMPS DU CANDIDAT NE SONT PAS FORCEMENT REMPLIS
   */
  pdfGenerate() {
    // liste les expériences du candidat
    this.experiences = [];
    for (const exp of this.candidat.experiences) {
      const varT = {text: 'Du : ' + exp.dateDebut + ' au ' + exp.dateFin + ' - ' + exp.typeContrat + '\n' + exp.posteOccuper + ': ' + exp.description};
      this.experiences.push(varT);
    }

    // list les compétences du candidat
    this.competences = [];
    for (const comp of this.candidat.competences) {
      const varT = {text: comp.nom};
      this.competences.push(varT);
    }

    const docDefinition = {
      content: [
        {
          table: {
            // permet au header de prendre toute la largeur de la page
            widths: ['*'],
            body: [
              [{text: this.candidat.prenom + ' ' + this.candidat.nom, style: 'header', fillColor: '#006DE0'}]
            ]
          },
          layout: 'noBorders'
        },
        {
          columns: [
            {
              text: this.candidat.titre != null
                ? this.candidat.titre + '\n' + this.candidat.email
                : '\n' + this.candidat.email, alignment: 'left'
            },
            {
              text: this.candidat.ville != null && this.candidat.codePostal != null
                ? this.candidat.ville + '\n' + this.candidat.codePostal
                : '', alignment: 'right'
            }
          ]
        },
        {text: '\nRésumé', bold: true},
        {text: this.candidat.apropos != null ? this.candidat.apropos : ''},
        // ligne bleu en base64
        {
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAADtgAAAH0CAYAAAANT8gSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAI1xJREFUeNrs3UHk33Ucx/Hf1nT6E51ijFjGiLJTp06xRESnEosuHdJInTplqVN2SIeYuqadpimi0xSdInUpYoydImKJ+fX52//Q4fff/v/v77ft+/d8PHj53t+H7+3pc2i5XC4AAAAAAAAAAAAAAAAAAKDisBMAAAAAAAAAAAAAAAAAAFAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwB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AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArCSAAAMAhOxOQBMvquYAAAAASUVORK5CYII=',
          width: 500,
          height: 20
        },
        {text: 'Expériences', bold: true},
        {
          ul: this.experiences
        },
        {
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAADtgAAAH0CAYAAAANT8gSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAI1xJREFUeNrs3UHk33Ucx/Hf1nT6E51ijFjGiLJTp06xRESnEosuHdJInTplqVN2SIeYuqadpimi0xSdInUpYoydImKJ+fX52//Q4fff/v/v77ft+/d8PHj53t+H7+3pc2i5XC4AAAAAAAAAAAAAAAAAAKDisBMAAAAAAAAAAAAAAAAAAFAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwBAAAAAAAAAAAAAAAAAEgR2AIAAAAAAAAAAAAAAAAAkCKwBQAAAAAAAAAAAAAAAAAgRWALAAAAAAAAAAAAAAAAAECKwBYAAAAAAAAAAAAAAAAAgBSBLQAAAAAAAAAAAAAAAAAAKQJbAAAAAAAAAAAAAAAAAABSBLYAAAAAAAAAAAAAAAAAAKQIbAEAAAAAAAAAAAAAAAAASBHYAgAAAAAAAAAAAAAAAACQIrAFAAAAAAAAAAAAAAAAACBFYAsAAAAAAAAAAAAAAAAAQIrAFgAAAAAAAAAAAAAAAACAFIEtAAAAAAAAAAAAAAAAAAApAlsAAAAAAAAAAAAAAAAAAFIEtgAAAAAAAAAAAAAAAAAApAhsAQAAAAAAAAAAAAAAAABIEdgCAAAAAAAAAAAAAAAAAJAisAUAAAAAAAAAAAAAAAAAIEVgCwAAAAAAAAAAAAAAAABAisAWAAAAAAAAAAAAAAAAAIAUgS0AAAAAAAAAAAAAAAAAACkCWwAAAAAAAAAAAAAAAAAAUgS2AAAAAAAAAAAAAAAAAACkCGwB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AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArAi2AAAAAAAAAAAAAAAAAACsCLYAAAAAAAAAAAAAAAAAAKwItgAAAAAAAAAAAAAAAAAArCSAAAMAhOxOQBMvquYAAAAASUVORK5CYII=',
          width: 500,
          height: 20
        },
        {text: 'Competences', bold: true},
        {
          ul: this.competences
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          color: 'white',
          bold: true
        }
      }
    };
    pdfMake.createPdf(docDefinition).download(this.candidat.prenom + this.candidat.nom + 'CV.pdf');
  }
}

