import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../../services/settings.service';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {Issue, Paginable, Project, Status} from '../beans';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StatusService extends AbstractRedmineService<Status> {

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public getAvailableStatus(trackerId: number, statusId?: number): Observable<Status[]> {
    let path = `${this.getRootPath()}/tracker/${trackerId}`;
    if(statusId) {
      path += `/status/${statusId}`
    }
    path += `/available`;
    return this.get(path).map((data: any) => {
      const paginable = new Paginable<Status>(data, this.mapper.bind(this));
      return paginable.elements;
    });
  }

  protected getRootPath(): string {
    return '/status';
  }

  protected mapper(data: any): Status {
    return new Status(data);
  }

}
