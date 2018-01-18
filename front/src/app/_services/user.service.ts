import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Observable} from "rxjs/Observable";
import {HttpHeaders} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {Response} from "@angular/http";


@Injectable()
export class UserService {
  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  getAll() {
    return this.http.get<User[]>('http://localhost:9090/rest/users');
  }

  getById(id: number) {
    return this.http.get('http://localhost:9090/rest/users/' + id);
  }

  create(user: User): Observable<any> {
    return this.http.post('http://localhost:9090/rest/users', user, this._options());
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
    return this.http.put('http://localhost:9090/rest/users' + user.id, user);
  }

  delete(email: string) {
    return this.http.delete('http://localhost:9090/rest/users/' + email);
  }

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers,
      responseType: 'text' };
  }
}
