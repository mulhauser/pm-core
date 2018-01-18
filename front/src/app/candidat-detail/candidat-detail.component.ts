import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../_services/user.service';
import { ErrorHandler } from '@angular/core';
import {CandidatService} from '../shared/candidat.service';
import {Profil} from '../_models/profil';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.css']
})
export class CandidatDetailComponent implements OnInit {

  private currentUser: any;
  private _candidat: any;

  @Input()
  modeModification = false;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _candidatService: CandidatService) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._candidatService.getCandidatByEmail(this.currentUser.email)
       .subscribe( data => {
         this._candidat = data;
       });
  }

  get candidat(): Profil {
    return this._candidat;
  }

  get candidatDetail (): Profil {
    return this.currentUser;
  }
  get modeModificationOn (): boolean {
    return this.modeModification;
  }
  set modeModificationOn (a: boolean) {
    this.modeModification = a;
  }

  private _fetchOne(email: string): Observable<any> {
    return this._userService.getByEmail(email);
  }

}
