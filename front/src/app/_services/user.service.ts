import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Observable} from "rxjs/Observable";
import {HttpHeaders} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {Response} from "@angular/http";
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  private _backendURL: any;

  constructor(private http: HttpClient, private alertService: AlertService) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);

  }

  getAll(): Observable<any> {
    return this.http.get<User[]>(this._backendURL.allUsers, this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);;
  }

  getByEmail(email: string) {
    return this.http.get(this._backendURL.getUserByEmail.replace(':email', email), this._backendURL)
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }

  create(user: User): Observable<any> {
    return this.http.post(this._backendURL.register, user, this._options());
      /*.map(response => {
        console.log(response);
        //if (response.status === 200) this.alertService.success('Registration successful', true);
        return response;
      })
      .catch(this.handleError);*/
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  update(user: User) {
    return this.http.put(this._backendURL.updateUser, user);
  }

  delete(email: string) {
    return this.http.delete(this._backendURL.deleteUser.replace(':email', email), this._options());
  }

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers,
      responseType: 'text' };
  }
}
