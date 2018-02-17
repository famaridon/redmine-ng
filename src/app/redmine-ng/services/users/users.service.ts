import {Injectable} from '@angular/core';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../beans';
import {SettingsService} from '../../../services/settings.service';
import {RealtimeService} from '../realtime/realtime.service';

@Injectable()
export class UsersService extends AbstractRedmineService<User> {

  private static readonly CURRENT_USER_ID = -255;
  private userCache: Map<number, Observable<User>> = new Map();

  constructor(http: HttpClient, settings: SettingsService, private rtService: RealtimeService ) {
    super(http, settings);

  }

  public findCurrent(): Observable<User> {
    this.get(`/users/current`).map((data: any) => {
      const user = this.mapper(data);
      return user;
    }).subscribe((user) => {
      this.asObservable(user.id, user);
      this.findSubject(UsersService.CURRENT_USER_ID).next(user);
      this.find(user.id);
    }, (error) => {
      this.asObservable(UsersService.CURRENT_USER_ID, null);
    });

    return this.asObservable(UsersService.CURRENT_USER_ID);
  }

  public find(id: number): Observable<User> {
    if (!this.userCache.has(id)) {
      this.userCache.set(id, super.find(id));
    }
    return this.userCache.get(id);
  }

  protected getRootPath(): string {
    return 'users';
  }

  protected mapper(data: any): User {
    return new User(data);
  }

}
