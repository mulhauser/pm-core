import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../_models/user';
import {AuthenticationService} from '../_services/authentication.service';
import {CookieService} from 'ngx-cookie-service';
import {KJUR, b64utoutf8} from 'jsrsasign';

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
    var payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(this._currentUser.token.split(".")[1]));
    console.log("payload");
    console.log(payloadObj);
    var test = new Date().getTime();

    console.log(test);
    return this.cookieService.check('isLogin');

  }

  getTypecompte(): any {
    return this.cookieService.get('typeCompte');
  }
}
