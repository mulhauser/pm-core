import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css', '../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class CandidatComponent implements OnInit {

  private candidatObj: any;

  constructor() { }

  ngOnInit() {
    console.log('email' + this.candidatObj.email);
  }

  @Input('candidatObj')
  set candidat (candidatObj: any){
    this.candidatObj = candidatObj;
    console.log(candidatObj);
  }
}
