import {Component, Input, OnInit} from '@angular/core';
import {CandidatService} from '../shared/candidat.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {

  private _candidats: any[];

  constructor(private _candidatervice: CandidatService) {
    this._candidats = [];
  }

  get candidats (): any[] {
    return this._candidats;
  }

  @Input()
  set candidats (candidats: any[]){
    this._candidats = candidats;
  }

  private _getAll(): Observable<any[]> {
    return this._candidatervice.getCandidats()
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }

  ngOnInit() {
    this._getAll().subscribe((candidats: any[]) => this._candidats = candidats);
  }

}
