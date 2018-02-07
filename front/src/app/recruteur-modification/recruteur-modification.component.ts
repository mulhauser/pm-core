import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RecruteurService} from '../shared/recruteur.service';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../_services/user.service';
import {AlertService} from '../_services/alert.service';

@Component({
  selector: 'app-recruteur-modification',
  templateUrl: './recruteur-modification.component.html',
  styleUrls: ['./recruteur-modification.component.css']
})
export class RecruteurModificationComponent implements OnInit {

  private recruteurDetail: any;
  private _urlPhoto: string;
  private _dialogStatus: string;



  constructor(private recruteurService: RecruteurService,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  @Input('recruteurDetail')
  set recruteur (recruteurDetail: any){
    this.recruteurDetail = recruteurDetail;
  }

  get urlPhoto(): string {
    return this._urlPhoto;
  }

  set urlPhoto(value: string) {
    this._urlPhoto = value;
  }


  update()  {
    // console.log('update ' + candidat.firstname);
    this.recruteurService.updateRecruteur(this.recruteurDetail)
      .subscribe(data =>
        this.alertService.success('Modifications effectuées', true)
      );

    if (this._urlPhoto != null || this._urlPhoto.length !== 0) {
      this.userService.updatePhoto(this.recruteurDetail.email, this._urlPhoto).subscribe();
    }

  }

}














