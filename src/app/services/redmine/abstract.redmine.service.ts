import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../settings.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;
import {AbstractRedmineBean, Issue} from "./beans";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export abstract class AbstractRedmineService<T extends AbstractRedmineBean> {

  protected http: HttpClient
  protected settings: SettingsService;
  protected server: string;
  protected socket: Socket;
  protected loadedObjects: Map<number, Subject<T>> = new Map();

  constructor(http: HttpClient, settings: SettingsService) {
    this.http = http;
    this.settings = settings;
    this.server = this.settings.getString('server');
    if (this.getNamspaceName()) {
      this.socket = io.connect(`${this.server}${this.getNamspaceName()}`, {path: `/ws`, query: 'user_id=5'});
    }
  }

  protected asObservable(id: number, object?: T): Observable<T> {
    const subject = this.loadIssueSubject(id);
    if (object) {
      subject.next(object);
    }
    return subject.asObservable();
  }

  protected notifyAll(object: T): void {
    const subject: Subject<T> = this.loadIssueSubject(object.id);
    if (subject) {
      console.log(`notify all #${object.id}`);
      subject.next(object);
    }
  }

  private loadIssueSubject(id: number): Subject<T> {
    if (typeof id !== 'number') {
      throw new Error('id must be a number');
    }
    let subject: Subject<T> = this.loadedObjects.get(+id);
    if (!subject) {
      subject = new BehaviorSubject(null);
      this.loadedObjects.set(+id, subject);
    }
    return subject;
  }

  protected getNamspaceName(): string {
    return undefined;
  }

}
