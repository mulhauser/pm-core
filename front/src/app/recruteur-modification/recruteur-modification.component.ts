import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecruteurService} from '../shared/recruteur.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-recruteur-modification',
  templateUrl: './recruteur-modification.component.html',
  styleUrls: ['./recruteur-modification.component.css']
})
export class RecruteurModificationComponent implements OnInit {

  private _recruteur: any[];

  constructor(private _recruteurService: RecruteurService) {
    this._recruteur = [];
  }



  get recruteur (): any[] {
    return this._recruteur;
  }

  @Input()
  set recruteur (recruteur: any[]){
    this._recruteur = recruteur;
  }


 // private _getAll(): Observable<any[]> {
 //   return this._recruteurService.getAll();
 // }

  ngOnInit() {
  //  this._getAll().subscribe((recruteur: any) => this._recruteur = JSON.parse(recruteur));
  }

}






















/////////////////////

