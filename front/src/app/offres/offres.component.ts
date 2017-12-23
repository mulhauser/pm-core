import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {OffreService} from '../shared/offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {

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
