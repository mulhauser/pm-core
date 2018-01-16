import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User;
  test = 'just a test';
  constructor(private auth: AuthService) { }

  onLogin(): void {

    const sampleUser: any = {
      email: 'michael@realpython.com' as string,
      password: 'michael' as string
    };

    this.auth.login(sampleUser).then((user) => {
      console.log(user.json());
    })
      .catch((err) => {
        console.log(err);
      });
  }

}
