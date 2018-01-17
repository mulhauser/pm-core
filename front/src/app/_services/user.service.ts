import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Observable} from "rxjs/Observable";
import {HttpHeaders} from "@angular/common/http";


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>('http://localhost:9090/rest/users');
  }

  getById(id: number) {
    return this.http.get('http://localhost:9090/rest/users/' + id);
  }

  create(user: User): Observable<any> {
    return this.http.post('http://localhost:9090/rest/users', user, this._options());
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers,
      responseType: 'text' };
  }
}
