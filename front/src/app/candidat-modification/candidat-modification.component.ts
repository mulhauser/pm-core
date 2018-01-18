import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-candidat-modification',
  templateUrl: './candidat-modification.component.html',
  styleUrls: ['./candidat-modification.component.css']
})
export class CandidatModificationComponent implements OnInit {

  private candidatDetail: any;

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  @Input('candidatDetail')
  set candidat (candidatDetail: any){
    this.candidatDetail = candidatDetail;
  }

  updateCandidat(candidat: any) {
 //   console.log('update ' + candidat.firstname);
   // return this._userService.update(candidat);
  }
}
