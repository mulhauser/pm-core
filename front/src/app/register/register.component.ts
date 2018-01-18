import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {AlertService} from '../_services/alert.service';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-register',
  moduleId: module.id.toString(),
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          if(error.status === 409) {
            this.alertService.error('Email déjà utilisé');
            this.loading = false;
          }
        });
  }

  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }
}
