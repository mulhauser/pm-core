import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TestModel} from '../test/test.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/defaultIfEmpty';


@Injectable()
export class TestService {
  //
  private _backendURL: any;


  constructor(private http: HttpClient) {
    this._backendURL = {};
    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }
  getTest(): Observable<any> {
    return this.http.get(this._backendURL.test, this._options())
      .filter( _ => !!_)
      .defaultIfEmpty([]);
  }
  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'text/plain' }, headerList));
    return { headers };
  }

}
