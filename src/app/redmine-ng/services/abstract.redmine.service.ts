///<reference path="../../../../node_modules/@types/socket.io-client/index.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/last';
import * as io from 'socket.io-client';
import {AbstractRedmineBean} from './beans';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Settings, SettingsService} from '../../services/settings.service';
import Socket = SocketIOClient.Socket;

@Injectable()
export abstract class AbstractRedmineService<T extends AbstractRedmineBean> {

  private http: HttpClient
  protected settings: Observable<Settings>;
  protected socket: Observable<Socket>;
  protected loadedObjects: Map<number, Subject<T>> = new Map();

  constructor(http: HttpClient, protected settingsService: SettingsService) {
    this.http = http;
    this.settings = this.settingsService.getSettings().filter((settings): boolean => {
      return settings.isValide();
    });
    // const socketSubject = new BehaviorSubject(null);
    // this.socket = socketSubject.asObservable().filter((socket) => {
    //   return this.socket ? false : true;
    // });
    // if (this.getNamspaceName()) {
    //   this.settings.subscribe((settings) => {
    //     const socket = io.connect(`${settings.server}${this.getNamspaceName()}`, {path: `/ws`, query: 'user_id=5'});
    //     socketSubject.next(socket);
    //   });
    // }
  }

  public find(id: number): Observable<T> {
    const obs = this.asObservable(id);
    this.get(`/${this.getRootPath()}/${id}`).map(this.mapper).subscribe((object) => {
      this.asObservable(id, object);
    });
    return obs;
  }

  protected get(path: string): Observable<any> {
    const subject = new Subject<any>();
    const subscription = this.settings.subscribe((settings) => {
      this.http.get(settings.server + path).subscribe((data) => {

        subscription.unsubscribe();
        subject.next(data);
      }, (error) => {
        subject.error(error);
      });
    });
    return subject.asObservable();
  }

  protected asObservable(id: number, object?: T): Observable<T> {
    const subject = this.findSubject(id);
    if (object) {
      subject.next(object);
    }
    return subject.asObservable();
  }

  protected notifyAll(object: T): void {
    const subject: Subject<T> = this.findSubject(object.id);
    if (subject) {
      subject.next(object);
    }
  }

  protected findSubject(id: number): Subject<T> {
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

  protected abstract getRootPath(): string;

  protected abstract mapper(data: any): T;

}
