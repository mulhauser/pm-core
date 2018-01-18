import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.css']
})
export class CandidatDetailComponent implements OnInit {

  private _candidatDetail: any;
  @Input()
  modeModification = false;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute) {
    this._candidatDetail = {};
  }

  ngOnInit() {
    this._route.params
      .map((params: any) => params.id)
      .flatMap((id: number) => this._fetchOne(id))
      .subscribe(
        (candidat: any) => this._candidatDetail = candidat
      );
  }

  get candidatDetail (): any {
    return this._candidatDetail;
  }
  get modeModificationOn (): boolean {
    return this.modeModification;
  }
  set modeModificationOn (a: boolean) {
    this.modeModification = a;
  }

  private _fetchOne(id: number): Observable<any> {
    return this._userService.getById(id);
  }

}
