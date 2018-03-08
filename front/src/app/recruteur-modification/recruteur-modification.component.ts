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
  private currentUser: any;

  constructor(private recruteurService: RecruteurService,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  @Input('recruteurDetail')
  set recruteur (recruteurDetail: any){
    this.recruteurDetail = recruteurDetail;
  }

  get urlPhoto(): string {
    return this.currentUser.urlPhoto;
  }

  set urlPhoto(value: string) {
    this.currentUser.urlPhoto = value;
  }


  update()  {
    // console.log('update ' + candidat.firstname);
    this.recruteurService.updateRecruteur(this.recruteurDetail)
      .subscribe(data =>
        this.alertService.success('Modifications effectuées', true)
      );

    if (this.currentUser.urlPhoto != null || this.currentUser.urlPhoto.length !== 0) {
      this.userService.updatePhoto(this.recruteurDetail.email, this.currentUser.urlPhoto).subscribe();
    }

  }

  suspendre() {
    this.recruteurService.suspendreRecruteur(this.recruteurDetail.id)
      .subscribe((data: any) => {
          this.recruteurDetail = data;
          this.alertService.warn('Votre compte à bien été suspendu', true);
        }
      );
  }

  supprimer() {
    this.recruteurService.supprimerRecruteur(this.recruteurDetail.id).subscribe();
    this.userService.delete(this.currentUser.email)
      .subscribe(any => this.alertService.warn('Votre compte à bien été supprimer ', true));
    this.router.navigate(['/login']);
  }

}














