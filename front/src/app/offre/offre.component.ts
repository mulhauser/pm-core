import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

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
