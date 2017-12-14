import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

  private candidatObj: any;

  constructor() { }

  ngOnInit() {
  }

  @Input('candidatObj')
  set candidat (candidatObj: any){
    this.candidatObj = candidatObj;
  }
}
