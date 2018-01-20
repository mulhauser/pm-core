import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {UserService} from '../_services/user.service';
import {CandidatService} from '../shared/candidat.service';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.css', '../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class CandidatDetailComponent implements OnInit {


  private currentUser: any;
  private candidat: any;

  @Input()
  modeModification = false;

  constructor(private _userService: UserService,
              private _route: ActivatedRoute,
              private _candidatService: CandidatService) {

  }

  ngOnInit() {
    let param: string;
    this._route.paramMap.subscribe(
      params => param = params.get('id')
    );
        if (param) {
          this._candidatService.getCandidatById(parseInt(param, 10))
            .subscribe( (data: any) => {
              this.candidat =  JSON.parse(data);
            });
        } else {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this._candidatService.getCandidatByEmail(this.currentUser.email)
            .subscribe( (data: any) => {
              this.candidat =  JSON.parse(data);
            });
        }
  }

  userProfil(): boolean {
    let res: boolean;
    res = false;
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (this.candidat.email === this.currentUser.email) {
        res = true;
      }
    }
    return res;
  }

  reload() {
    this._candidatService.getCandidatByEmail(this.currentUser.email)
      .subscribe( (data: any) => {
        this.candidat =  JSON.parse(data);
      });
  }

  get candidatDetail(): any {
    return this.candidat;
  }

  get modeModificationOn (): boolean {
    return this.modeModification;
  }
  set modeModificationOn (a: boolean) {
    this.modeModification = a;
  }

}
