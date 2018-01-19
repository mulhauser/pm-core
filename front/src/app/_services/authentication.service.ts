import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthenticationService {


  // private _isLogIn = false;

    constructor(private http: HttpClient,
                private cookieService: CookieService) { }

    login(email: string, password: string) {
        return this.http.post<any>('http://localhost:9090/rest/users/login', { email: email, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
              // this._isLogIn = true;
              this.cookieService.set( 'isLogin', '1' );
              return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
      // this._isLogIn = false;
      this.cookieService.delete('isLogin');
    }

  /** get isLogIn(): boolean {
      return this._isLogIn;
   }

   set isLogIn(value: boolean) {
     this._isLogIn = value;
    }**/
}
