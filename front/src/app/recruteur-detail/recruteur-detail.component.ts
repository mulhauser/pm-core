import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {UserService} from '../_services/user.service';
import {RecruteurService} from '../shared/recruteur.service';

@Component({
  selector: 'app-recruteur-detail',
  templateUrl: './recruteur-detail.component.html',
  styleUrls: ['./recruteur-detail.component.css', '../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class RecruteurDetailComponent implements OnInit {

  private currentUser: any;
  private recruteur: any;
  private _dialogStatus: string;


  @Input()
  modeModification = false;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _recruteurService: RecruteurService) {

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
        });
    }
    console.log(this.recruteur);
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



/**
  showModalAjoutPoste() {
    // set dialog status
    this._dialogStatus = 'active';
    // open modal
    const dialogRef = this._competenceDialog.open(ModalAjoutCompetenceComponent, {
      size: 'lg',
      keyboard: true,
      backdrop: 'static'
    });
    dialogRef.result.then(
      (result) => {
        this._addCompetence(result.value)
          .subscribe(
            (infoCompetence: any) => {
              this._infoCompetence = infoCompetence;
            },
            () => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
          );
      }, (reason) => {
        this._dialogStatus = 'inactive';
      }
    );
  }


**/


}
