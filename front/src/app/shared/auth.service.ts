import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  private _backendURL: any;

  constructor(private http: Http) {
    this._backendURL = {};
    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  login(user): Promise<any> {
    return this.http.post(this._backendURL.login, user, this._options()).toPromise();
  }

  register(user): Promise<any> {
    return this.http.post(this._backendURL.register, user, this._options()).toPromise();
  }

  test(): string {
    return 'working';
  }

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers };
  }
}
