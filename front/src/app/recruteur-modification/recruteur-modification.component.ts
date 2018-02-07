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
    this.candidatDetail = candidatDetail;
  }

  get urlPhoto(): string {
    return this._urlPhoto;
  }

  set urlPhoto(value: string) {
    this._urlPhoto = value;
  }


  update()  {
    // console.log('update ' + candidat.firstname);
    this.candidatService.updateCandidat(this.candidatDetail)
      .subscribe(data =>
        this.alertService.success('Modifications effectuées', true)
      );

    if (this._urlPhoto != null || this._urlPhoto.length !== 0) {
      this.userService.updatePhoto(this.candidatDetail.email, this._urlPhoto).subscribe();
    }

  }
  /*
    cancel() {
      this.alertService.clear();
      this.router.navigate(['/home']);
    }*/


  showModalExperience() {
    // set dialog status
    this._dialogStatus = 'active';
    // open modal
    const dialogRef = this._experienceDialog.open(ModalAjoutExperienceComponent, {
      size: 'lg',
      keyboard: true,
      backdrop: 'static'
    });
    dialogRef.result.then(
      (result) => {
        this._addExperience(result.value)
          .subscribe(
            (infoExperience: any) => {
              this._infoExperience = infoExperience;
            },
            () => this._dialogStatus = 'inactive',
            () => {this._dialogStatus = 'inactive'; window.location.reload();}
          );
      }, (reason) => {
        this._dialogStatus = 'inactive';
      }
    );
  }



  showModalCompetence() {
    // set dialog status
    this._dialogStatus = 'active';
    // open modal
    const dialogRef = this._competenceDialog.open(ModalAjoutCompetenceComponent, {
      size: 'lg',
      keyboard: true,
      backdrop: 'static'
    });
    dialogRef.result.then(
      (result) => {
        this._addCompetence(result.value)
          .subscribe(
            (infoCompetence: any) => {
              this._infoCompetence = infoCompetence;
            },
            () => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
          );
      }, (reason) => {
        this._dialogStatus = 'inactive';
      }
    );
  }



  private _addExperience (experience: any): Observable<any> {
    return this.candidatService.addCandidatExperience(experience, this.candidatDetail.id)
      .flatMap(_ => _);
  }

  private _addCompetence (competence: any): Observable<any> {
    return this.candidatService.addCandidatCompetence(competence, this.candidatDetail.id, competence.idCompetence)
      .flatMap(_ => _);
  }










  get dialogStatus(): string {
    return this._dialogStatus;
  }

  updateExperiences(){
  }

}






















/////////////////////

