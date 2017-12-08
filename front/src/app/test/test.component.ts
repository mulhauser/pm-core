import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TestService} from '../shared/test.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  private _testDetail: any = {};

  constructor(private _testService: TestService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params
      .map((params: any) => params)
      .flatMap((_) => this._test())
      .subscribe(
        (test: any) => this._testDetail = test
      );
  }

  private _test(): Observable<any> {
    return this._testService.getTest();
  }

  get testDetail(): any{
    return this._testDetail;
  }
}
