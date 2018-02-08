import { Component, OnInit } from '@angular/core';
import { ChatAdapter, UserStatus } from 'ng-chat';
import {Observable} from 'rxjs/Observable';
import {Message} from 'ng-chat/ng-chat/core/message';
import {User} from 'ng-chat/ng-chat/core/user';
import {$} from 'protractor';
import {CandidatService} from '../shared/candidat.service';

@Component({
  selector: 'app-char-adapter',
  templateUrl: './char-adapter.component.html',
  styleUrls: ['./char-adapter.component.css']
})
export class CharAdapterComponent extends ChatAdapter  implements OnInit {


  /**
  constructor(  private _dataService: CandidatService  ) {
    super();

    // initializing the connection
    // this.connection = $.connection;

    // Creates a proxy to the ChatHub
    // this.proxy = $.connection.hub.createHubProxy('chatHub');

    this.bindSignalREvents();

 //    this.connection.hub.start(() => {
      // Connection has been stablished
  //    this.userId = this.proxy.connection.id;
 //   });
  }

  // The id generated to the user that has just connected
  public userId: any;

  // signalR connection reference
   // private connection: SignalR;

  // signalR proxy reference
 // private proxy: SignalR.Hub.Proxy;

  listFriends(): Observable<User[]> {
     return this._dataService.getAll();
   // return Observable.of([]);
  }

  getMessageHistory(userId: any): Observable<Message[]> {
    return Observable.of([]); // TODO: History not necessary for the demo adapter (Could call an API endpoint here)
  }

  sendMessage(message: Message): void {
    // this.proxy.invoke("SendMessage", message);
  }

  private bindSignalREvents(): void {
    // this.proxy.on("notifyOfMessage", (user: User, message: Message) => {
    //   this.onMessageReceived(user, message);
   //  });
  }
 */

private mockedUsers: User[] = [
  {
    id: 1,
    displayName: 'Arya Stark',
    avatar: 'https://pbs.twimg.com/profile_images/894833370299084800/dXWuVSIb.jpg',
    status: UserStatus.Online
  },
  {
    id: 2,
    displayName: 'Cersei Lannister',
    avatar: null,
    status: UserStatus.Online
  },
  {
    id: 3,
    displayName: 'Daenerys Targaryen',
    avatar: 'https://68.media.tumblr.com/avatar_d28d7149f567_128.png',
    status: UserStatus.Busy
  },
  {
    id: 4,
    displayName: 'Eddard Stark',
    avatar: 'https://pbs.twimg.com/profile_images/600707945911844864/MNogF757_400x400.jpg',
    status: UserStatus.Offline
  },
  {
    id: 5,
    displayName: 'Hodor',
    avatar: 'https://pbs.twimg.com/profile_images/378800000449071678/27f2e27edd119a7133110f8635f2c130.jpeg',
    status: UserStatus.Offline
  },
  {
    id: 6,
    displayName: 'Jaime Lannister',
    avatar: 'https://pbs.twimg.com/profile_images/378800000243930208/4fa8efadb63777ead29046d822606a57.jpeg',
    status: UserStatus.Busy
  },
  {
    id: 7,
    displayName: 'John Snow',
    avatar: 'https://pbs.twimg.com/profile_images/3456602315/aad436e6fab77ef4098c7a5b86cac8e3.jpeg',
    status: UserStatus.Busy
  },
  {
    id: 8,
    displayName: 'Lorde Petyr \'Littlefinger\' Baelish',
    avatar: 'http://68.media.tumblr.com/avatar_ba75cbb26da7_128.png',
    status: UserStatus.Offline
  },
  {
    id: 9,
    displayName: 'Sansa Stark',
    avatar: 'http://pm1.narvii.com/6201/dfe7ad75cd32130a5c844d58315cbca02fe5b804_128.jpg',
    status: UserStatus.Online
  },
  {
    id: 10,
    displayName: 'Theon Greyjoy',
    avatar: 'https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg',
    status: UserStatus.Away
  }];


  private _userr: any;

  ngOnInit(): void {
    this._getAll().subscribe((candidats: any) => this._userr = candidats);
  }

  private _getAll(): Observable<any[]> {
    return this._dataService.getAll();
  }

  listFriends(): Observable<any> {
  //  this.userr = this._dataService.getAll();
    console.log('users ' + this._userr);
   // console.log('coucou' + Observable.of(this._dataService.getAll()));
  //  return Observable.of(this._dataService.getAll());
    return Observable.of(this.mockedUsers);
  }

  getMessageHistory(userId: any): Observable<Message[]> {
    let mockedHistory: Array<Message>;

    mockedHistory = [
      {
        fromId: 1,
        toId: 999,
        message: 'Hi there, just type any message bellow to test this Angular module.'
      }
    ];

    return Observable.of(mockedHistory);
  }

  sendMessage(message: Message): void {
    setTimeout(() => {
      let replyMessage = new Message();

      replyMessage.fromId = message.toId;
      replyMessage.toId = message.fromId;
      replyMessage.message = 'You have typed \'' + message.message + '\'';

      let user = this.mockedUsers.find(x => x.id === replyMessage.fromId);

      this.onMessageReceived(user, replyMessage);
    }, 1000);
  }

  constructor(  private _dataService: CandidatService  ) {
    super();

    // initializing the connection
    // this.connection = $.connection;

    // Creates a proxy to the ChatHub
    // this.proxy = $.connection.hub.createHubProxy('chatHub');

    // this.bindSignalREvents();

    //    this.connection.hub.start(() => {
    // Connection has been stablished
    //    this.userId = this.proxy.connection.id;
    //   });
  }
}
