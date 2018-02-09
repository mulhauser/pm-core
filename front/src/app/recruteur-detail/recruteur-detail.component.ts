import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {UserService} from '../_services/user.service';
import {RecruteurService} from '../shared/recruteur.service';
import {ModalAjoutPosteComponent} from '../shared/modal-ajout-poste/modal-ajout-poste.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import {Offre} from "../_models/offre";

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

   offreDuRecruteur: any = [];

  @Input()
  modeModification = false;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _recruteurService: RecruteurService,
              private _offreDialogue: NgbModal) {

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
          this._offreDuRecruteurInit(this.recruteur.id).subscribe((offres: any[]) => this.offreDuRecruteur = offres);
          console.log('OBJECT : ', this.offreDuRecruteur);
        });
    }
  }

  private _offreDuRecruteurInit(id: any): Observable<any[]> {
   // console.log('lesoffres' + this._recruteurService.gerRecruteurOffres(this.currentUser.id).filter(_ => !!_).defaultIfEmpty([]));
    return this._recruteurService
      .gerRecruteurOffres(id)
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }








  userProfil(): boolean {
    let res: boolean;
    res = false;
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (this.recruteur.email === this.currentUser.email) {
        res = true;
      }
    }
    return res;
  }

  reload() {
    this._recruteurService.getRecruteurByEmail(this.currentUser.email)
      .subscribe( (data: any) => {
        this.recruteur =  JSON.parse(data);
      });
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



  private _addOffre (offre: Offre): Observable<any> {
    return this._recruteurService.addRecruteurOffre(offre, this.recruteurDetail.id)
      .flatMap(_ => _);
  }



}
