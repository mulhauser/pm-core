import {Component, Input, OnInit} from '@angular/core';
import {CompetencesService} from '../shared/competences.service';
import {Observable} from 'rxjs/Observable';
import {RecruteurService} from '../shared/recruteur.service';
import {OffreService} from '../shared/offre.service';
import {AlertService} from '../_services/alert.service';

@Component({
  selector: 'app-offre-modification',
  templateUrl: './offre-modification.component.html',
  styleUrls: ['./offre-modification.component.css']
})
export class OffreModificationComponent implements OnInit {

  competences = [];
  private currentUser: any;
  private offreDetail: any;


  constructor(private _competenceService: CompetencesService,
              private _offreService: OffreService,
              private _alertService: AlertService
  ) { }


  ngOnInit() {
    this._getAllCompetences().subscribe((competences: any) => this.competences = competences);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('competence' + this.competences);
  }

  private _getAllCompetences(): Observable<any[]> {
    return this._competenceService.getCompetences();
  }

  @Input('offreDetail')
  set offre (offreDetail: any){
    this.offreDetail = offreDetail;
  }

  update()  {
    // console.log('update ' + candidat.firstname);
    this._offreService.updateOffre(this.offreDetail)
      .subscribe(data =>
        this._alertService.success('Modifications effectuées', true)
      );
  }

}
