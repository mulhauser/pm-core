import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../_services/user.service';
import {CandidatService} from '../shared/candidat.service';
import {Router} from '@angular/router';
import {AlertService} from '../_services/alert.service';

@Component({
  selector: 'app-candidat-modification',
  templateUrl: './candidat-modification.component.html',
  styleUrls: ['./candidat-modification.component.css']
})
export class CandidatModificationComponent implements OnInit {


  private candidatDetail: any;

  constructor(private candidatService: CandidatService,
              private router: Router,
              private alertService: AlertService) { }

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
}
