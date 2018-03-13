import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {UserService} from '../_services/user.service';
import {RecruteurService} from '../shared/recruteur.service';
import {ModalAjoutPosteComponent} from '../shared/modal-ajout-poste/modal-ajout-poste.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {Offre} from "../_models/offre";
import {noUndefined} from "@angular/compiler/src/util";
import {isUndefined} from "util";
import {AlertService} from "../_services/alert.service";
import {ModalInviterAmisComponent} from '../shared/modal-inviter-amis/modal-inviter-amis.component';
import {MailService} from '../shared/mail.service';

@Component({
  selector: 'app-recruteur-detail',
  templateUrl: './recruteur-detail.component.html',
  styleUrls: ['./recruteur-detail.component.css', '../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class RecruteurDetailComponent implements OnInit {

  private currentUser: any;
  private recruteur: any;
  private _dialogStatus: string;
  private _infoOffre: any = {};
  private _infoMail: any;


  offreDuRecruteur: any = [];

  @Input()
  modeModification = false;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private alertService: AlertService,
              private _recruteurService: RecruteurService,
              private _inviterAmisDialog: NgbModal,
              private _offreDialogue: NgbModal,
              private _mailService: MailService) {

  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }



  ngOnInit() {
    let param: string;
    this._route.paramMap.subscribe(
      params => param = params.get('id')
    );
    if (param) {
      this._recruteurService.getRecruteurById(parseInt(param, 10))
        .subscribe( (data: any) => {
          this.recruteur =  JSON.parse(data);
        });
    } else {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this._recruteurService.getRecruteurByEmail(this.currentUser.email)
        .subscribe( (data: any) => {
          this.recruteur =  JSON.parse(data);
          //  ON INSTANCIE LA LISTE D'OFFRES Du RECRUTEUR
         // this._offreDuRecruteurInit(this.recruteur.id).subscribe((offres: any[]) => this.offreDuRecruteur = offres);

        });
    }
  }

  offre() {
   // console.log('lesoffres' + this._recruteurService.gerRecruteurOffres(this.currentUser.id).filter(_ => !!_).defaultIfEmpty([]));
     this._recruteurService.gerRecruteurOffres(this.recruteur.id).subscribe((offres: any) => this.recruteur.offres = JSON.parse(offres));
  }


  userProfil(): boolean {
    let res: boolean;
    res = false;
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!isUndefined(this.recruteur)) {
        if (this.recruteur.email === this.currentUser.email) {
          res = true;
        }
      }
    }
    return res;
  }

  reload() {
    this._recruteurService.getRecruteurByEmail(this.currentUser.email)
      .subscribe( (data: any) => {
        this.recruteur =  JSON.parse(data);
      });
    this.alertService.clear();
  }

  get recruteurDetail(): any {
      return this.recruteur;
  }


  get modeModificationOn (): boolean {
    return this.modeModification;
  }
  set modeModificationOn (a: boolean) {
    this.modeModification = a;
  }




  showModalAjoutPoste() {
    // set dialog status
    this._dialogStatus = 'active';
    // open modal
    const dialogRef = this._offreDialogue.open(ModalAjoutPosteComponent, {
      size: 'lg',
      keyboard: true,
      backdrop: 'static'
    });
    dialogRef.result.then(
      (result) => {
        this._addOffre(result.value)
          .subscribe(
            (infoOffre: any) => {
              this._infoOffre = infoOffre;
            },
            () => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
          );
      }, (reason) => {
        this._dialogStatus = 'inactive';
      }
    );
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



  private _addOffre (offre: Offre): Observable<any> {
    return this._recruteurService.addRecruteurOffre(offre, this.recruteurDetail.id)
      .flatMap(_ => _);
  }



}
