import { Component } from '@angular/core';
import {ChatAdapter} from 'ng-chat/ng-chat/core/chat-adapter';
import {CharAdapterComponent} from './char-adapter/char-adapter.component';
import {CandidatService} from './shared/candidat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userId = 999;

  public candid: CandidatService;
  public adapter: ChatAdapter = new CharAdapterComponent(this.candid);
  public listeCandid: "liste";
}
