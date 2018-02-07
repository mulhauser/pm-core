import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../_models/user';
import {AuthenticationService} from '../_services/authentication.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private _currentUser: User;

  constructor(private authService: AuthenticationService,
              private cookieService: CookieService) {

  }

  ngOnInit() {
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


  get currentUser(): User {
    return this._currentUser;
  }

  getLogIn(): boolean {
    // console.log('a' + this.cookieService.check('isLogin'));
    return this.cookieService.check('isLogin');

  }

  getTypecompte(): any {
    return this.cookieService.get('typeCompte');
  }
}
