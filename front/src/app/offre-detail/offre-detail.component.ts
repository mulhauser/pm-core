import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OffreService} from '../shared/offre.service';
import {Observable} from 'rxjs/Observable';
import {CandidatService} from "../shared/candidat.service";
import {CookieService} from "ngx-cookie-service";
import {isUndefined} from "util";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.css']
})
export class OffreDetailComponent implements OnInit {

  // private property to store eventDetail value
  private _offreDetail: any = {};
  private currentUser: any;
  private candidat: any;
  private _candidats: any[];
  private valueinputCheck: any;
  public checkBoxGroupForm: FormGroup;

  @Input()
  modeModification = false;


  constructor(private _offreService: OffreService,
              private _route: ActivatedRoute,
              private _candidatService: CandidatService,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.checkBoxGroupForm = this.formBuilder.group({
      'exp': false
    });
    this.valueinputCheck = 'Avec Expériences ';
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: string) => this._fetchOne(id))
      .subscribe(
        (offre: any) => {
          this._offreDetail = offre;
          this._candidatService.getCandidatMatch(this._offreDetail.id, this.checkBoxGroupForm.value['exp']).subscribe((candidats: any) => {
            this._candidats = JSON.parse(candidats.body);
          });
        }
      );

  }

  /**
   * function who return the value of offreDetail
   * @returns {any}
   */
  get offreDetail(): any{
    return this._offreDetail;
  }

  updateMatch() {
    if (this.checkBoxGroupForm.value['exp'] === false) {
      this.checkBoxGroupForm = this.formBuilder.group({
        'exp': true
      });
      this.valueinputCheck = 'Sans Expériences ';
    } else {
      this.checkBoxGroupForm = this.formBuilder.group({
        'exp': false
      });
      this.valueinputCheck = 'Avec Expériences ';
    }

    console.log(this.checkBoxGroupForm.value['exp']);

    this._candidatService.getCandidatMatch(this._offreDetail.id, this.checkBoxGroupForm.value['exp']).subscribe((candidats: any) => {
      this._candidats = JSON.parse(candidats.body);
      console.log(this._candidats);
    });
  }

  /**
   * Vérifie si l'utilisateur est le recruteur qui a posté cette offre
   * @returns {boolean}
   */
  userProfil(): boolean {
    let res: boolean;
    res = false;
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!isUndefined(this._offreDetail.recruteur)) {
        if (this._offreDetail.recruteur.email === this.currentUser.email) {
          res = true;
        }
      }
    }
    return res;
  }

  get candidats (): any[] {
    return this._candidats;
  }

  /**
   * Returns an observable fetchs one event by id
   *
   * @param id
   *
   * @returns {Observable<any>}
   *
   * @private
   */
  private _fetchOne (id: string): Observable<any> {
    return this._offreService.getOffreDetails(id);
  }

  postuler() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._candidatService.getCandidatByEmail(this.currentUser.email)
      .subscribe((data: any) => {
        this.candidat = JSON.parse(data.body);
        this._candidatService.postulerOffre(this._offreDetail, this.candidat.id).subscribe();
      });

  }

  isCandidat(): boolean{
    return this.cookieService.get('typeCompte') === 'candidat';
  }

  suspendre() {
    this._offreService.setSuspendreOffre(this._offreDetail.id)
      .subscribe((data: any) => {
        this._offreDetail = data;
      });
  }

  isSuspendu(): boolean{
    return this._offreDetail.suspendu;
  }

  get modeModificationOn (): boolean {
    return this.modeModification;
  }
  set modeModificationOn (a: boolean) {
    this.modeModification = a;
  }
}
