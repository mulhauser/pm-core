import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {KJUR, b64utoutf8} from 'jsrsasign';

@Injectable()
export class AuthenticationService {
  get isLogIn(): boolean {
    return this._isLogIn;
  }

  set isLogIn(value: boolean) {
    this._isLogIn = value;
  }

  private _isLogIn = false;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:9090/rest/users/login', {email: email, password: password})
      .map(user => {

        // login successful if there's a jwt token in the response
        if (user && user.token) {
          console.log(user.token);
          var isValid = KJUR.jws.JWS.verifyJWT(user.token, "616161", {alg: ['HS256']});
          console.log("is valid");
          console.log(isValid);
          var payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(user.token.split(".")[1]));
          console.log("payload");
          console.log(payloadObj);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this._isLogIn = true;
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._isLogIn = false;
  }
}
