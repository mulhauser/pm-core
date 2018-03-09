import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {KJUR, b64utoutf8} from 'jsrsasign';
import {CookieService} from 'ngx-cookie-service';
import {environment} from "../../environments/environment";


@Injectable()
export class AuthenticationService {

  currentUser: any;
  private _backendURL: any;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);

  }


  login(email: string, password: string) {
    return this.http.post<any>(this._backendURL.login, {email: email, password: password})
      .map(user => {

        // login successful if there's a jwt token in the response
        if (user && user.token) {
          /*
          VOIR POUR LA VERIFICATION DU TOKEN
          console.log(user.token);
          // la chaine "simplekey" est définie dans le back
          var isValid = KJUR.jws.JWS.verifyJWT(user.token, "simplekey", {alg: ['HS256']});
          console.log("is valid");
          console.log(isValid);
          var payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(user.token.split(".")[1]));
          console.log("payload");
          console.log(payloadObj);*/

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        // this._isLogIn = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.cookieService.set('isLogin', '1');
        this.cookieService.set('typeCompte', this.currentUser.type);
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // this._isLogIn = false;
    this.cookieService.delete('isLogin');
    this.cookieService.delete('typeCompte');
  }

}
