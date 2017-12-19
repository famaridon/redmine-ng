import {Injectable} from '@angular/core';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../beans';
import {SettingsService} from '../../../services/settings.service';

@Injectable()
export class UsersService extends AbstractRedmineService<User> {

  private static readonly CURRENT_USER_ID = -255;
  private userCache: Map<number, Observable<User>> = new Map();

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public findLoggedOnUser(): Observable<User> {
    this.get(`/users/current`).map((data: any) => {
      const user = new User(data.user);
      return user;
    }).subscribe((user) => {
      this.asObservable(user.id, user);
      this.asObservable(UsersService.CURRENT_USER_ID, user);
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
    return new User(data.user);
  }
}
