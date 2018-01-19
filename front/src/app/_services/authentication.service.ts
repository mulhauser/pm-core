﻿import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

<<<<<<< HEAD
import {KJUR, b64utoutf8} from 'jsrsasign';

======
=
import {CookieService} from 'ngx-cookie-service';

>>>>>>>
e5e699c39b9941b13b11279c12afd9a54aa5333a

@Injectable()
export class AuthenticationService {


  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }


  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:9090/rest/users/login', {email: email, password: password})
      .map(user => {

        // login successful if there's a jwt token in the response
        if (user && user.token) {
          /*
          VOIR POUR LA VERIFICATION DU TOKEN
          console.log(user.token);
          var isValid = KJUR.jws.JWS.verifyJWT(user.token, "616161", {alg: ['HS256']});
          console.log("is valid");
          console.log(isValid);
          var payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(user.token.split(".")[1]));
          console.log("payload");
          console.log(payloadObj);*/

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        // this._isLogIn = true;
        this.cookieService.set('isLogin', '1');
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // this._isLogIn = false;
    this.cookieService.delete('isLogin');
  }

}
