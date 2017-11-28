import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../settings.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

@Injectable()
export abstract class AbstractRedmineService {

  protected http: HttpClient
  protected settings: SettingsService;
  protected server: string;
  protected socket: Socket;

  constructor(http: HttpClient, settings: SettingsService) {
    this.http = http;
    this.settings = settings;
    this.server = this.settings.getString('server');
    if (this.getNamspaceName()) {
      this.socket = io.connect(`${this.server}${this.getNamspaceName()}`, {path: `/ws`, query: 'user_id=5'});
    }
  }

  protected getNamspaceName(): string {
    return undefined;
  }

}
