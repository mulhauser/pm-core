import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../_services/user.service';
import {CandidatService} from '../shared/candidat.service';
import {Router} from '@angular/router';
import {AlertService} from '../_services/alert.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalConnexionCandidatComponent} from '../shared/modal-connexion-candidat/modal-connexion-candidat.component';

@Component({
  selector: 'app-candidat-modification',
  templateUrl: './candidat-modification.component.html',
  styleUrls: ['./candidat-modification.component.css']
})
export class CandidatModificationComponent implements OnInit {


  private candidatDetail: any;
  private _dialogStatus: string;
  private _infoExperience: any = {};

  constructor(private candidatService: CandidatService,
              private router: Router,
              private alertService: AlertService,
              private _experienceDialog: NgbModal) { }

  ngOnInit() {
  }

  @Input('candidatDetail')
  set candidat (candidatDetail: any){
    this.candidatDetail = candidatDetail;
  }


  update()  {
    // console.log('update ' + candidat.firstname);
    this.candidatService.updateCandidat(this.candidatDetail)
      .subscribe(data =>
        this.alertService.success('Modifications effectuées', true)
      );

  }

  cancel() {
    this.alertService.clear();
    this.router.navigate(['/home']);
  }


  showModalExperience() {
    this._dialogStatus = 'active';
    // open modal
    const dialogRef = this._experienceDialog.open(ModalConnexionCandidatComponent, {
      size: 'lg',
      keyboard: true,
      backdrop: 'static'
    });
    dialogRef.result.then(
      (result) => {
        this._addExperience(result.value)
          .subscribe(
            (infoExperience: any) => this._infoExperience = infoExperience,
            () => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
          );
      }, (reason) => {
        this._dialogStatus = 'inactive';
      }
    );
  }

  private _addExperience (experience: any): Observable<any> {
    console.log(experience);
   return null;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }
}
