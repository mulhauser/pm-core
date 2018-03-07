import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-offre-du-recruteur',
  templateUrl: './offre-du-recruteur.component.html',
  styleUrls: ['./offre-du-recruteur.component.css']
})
export class OffreDuRecruteurComponent implements OnInit {

  private offreObj: any;

  constructor() { }

  ngOnInit() {

  }

  /**
   * return the event object
   * @param eventObj
   */
  @Input('offreObj')
  set offre (offreObj: any){
    this.offreObj = offreObj;
  }

}
