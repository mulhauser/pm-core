import {Component, Input, OnChanges, OnInit} from '@angular/core';
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
  valeurMax: any;
  valeurMin: any;
  salaireIncorect: boolean;



  constructor(private _competenceService: CompetencesService,
              private _offreService: OffreService,
              private _alertService: AlertService
  ) { }


  ngOnInit() {
    this._getAllCompetences().subscribe((competences: any) => this.competences = competences);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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


  updateSalaireMax(a) {
    this.valeurMax = a;
    console.log('max' + this.valeurMax);
  }

  updateSalaireMin(a) {
    this.valeurMin = a;
    console.log('min' + this.valeurMin);
  }

  verificationSalaireMax() {
    if (this.valeurMax <= this.valeurMin) {
      this.salaireIncorect = false; // c'est pas bon
    } else {
      this.salaireIncorect = true; // c'est bon
    }
  }

  verificationSalaireMin() {
    if (this.valeurMax >= this.valeurMin) {
      this.salaireIncorect = true; // c'est pas bon
    } else {
      this.salaireIncorect = false; // c'est bon
    }
  }

}
