import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../_models/user';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  getLogIn(): boolean {
    console.log('login' + this.authService.isLogIn);
    return this.authService.isLogIn;
  }

}
