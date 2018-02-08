import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OffreService} from '../offre.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-offre-detail',
  templateUrl: './offre-detail.component.html',
  styleUrls: ['./offre-detail.component.css']
})
export class OffreDetailComponent implements OnInit {

  // private property to store eventDetail value
  private _offreDetail: any = {};
  private currentUser: any;

  constructor(private _offreService: OffreService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: string) => this._fetchOne(id))
      .subscribe(
        (offre: any) => this._offreDetail = offre
      );
  }

  /**
   * function who return the value of offreDetail
   * @returns {any}
   */
  get offreDetail(): any{
    return this._offreDetail;
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
      if (this._offreDetail.recruteur.email === this.currentUser.email) {
        res = true;
      }
    }
    return res;
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
  private _fetchOne(id: string): Observable<any> {
    return this._offreService.getOffreDetails(id);
  }
}
