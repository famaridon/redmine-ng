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
  private gravatarCache: any;

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
    const gravatarCacheJson = localStorage.getItem('gravatar');
    if (gravatarCacheJson) {
      this.gravatarCache = JSON.parse(gravatarCacheJson);
    } else {
      this.gravatarCache = {};
      this.saveGravatarCache();
    }

  }

  public findLoggedOnUser(): Observable<User> {
    this.get(`/users/current`).map((data: any) => {
      const user = new User(data.user);
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
      this.userCache.get(id).subscribe((user) => {
        if (user && !user.gravatar) {
          this.findGravatar(user).then((gravatar) => {
            user.gravatar = gravatar;
            this.findSubject(id).next(user);
          });
        }
      });
    }
    return this.userCache.get(id);
  }

  private findGravatar(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
      let gravatar = this.gravatarCache['' + user.id];
      if (gravatar) {
        resolve(gravatar);
      } else {
        this.get(`/users/${user.id}/gravatar`).subscribe((g) => {
            gravatar = g.user.gravatar;
            this.gravatarCache['' + user.id] = gravatar;
            this.saveGravatarCache();
            resolve(gravatar);
          },
          (err) => {
            reject(err);
          })
      }
    });
  }

  protected getRootPath(): string {
    return 'users';
  }

  protected mapper(data: any): User {
    return new User(data.user);
  }

  private saveGravatarCache() {
    localStorage.setItem('gravatar', JSON.stringify(this.gravatarCache));
  }
}
