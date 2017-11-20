import {Injectable} from '@angular/core';
import {AbstractRedmineService} from './abstract.redmine.service';
import {SettingsService} from '../settings.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './beans';

@Injectable()
export class UsersService extends AbstractRedmineService {

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public findLoggedOnUser(): Observable<User> {
    return this.http.get(this.server + `/users/current`).retry(3).map((data: any) => {
      return data.user;
    });
  }
}
