import {Component, Input, OnInit} from '@angular/core';
import {OffreService} from '../shared/offre.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-offres-du-recruteur',
  templateUrl: './offres-du-recruteur.component.html',
  styleUrls: ['./offres-du-recruteur.component.css']
})
export class OffresDuRecruteurComponent implements OnInit {

  private _offres: any[];

  constructor(private _offreService: OffreService) {
    this._offres = [];
  }


  get offres (): any[] {
    return this._offres;
  }

  @Input()
  set offres (offres: any[]){
    this._offres = offres;
  }

  private _getAll(): Observable<any[]> {
    return this._offreService.getOffres()
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }

  ngOnInit() {
    this._getAll().subscribe((offres: any[]) => this._offres = offres);
  }
}
