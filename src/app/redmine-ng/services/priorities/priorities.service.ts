import {Injectable} from '@angular/core';
import {Paginable, Priority, Status} from '../beans';
import {HttpClient} from '@angular/common/http';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {SettingsService} from '../../../services/settings.service';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PrioritiesService extends AbstractRedmineService<Priority> {

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public findAll(): Observable<Paginable<Priority>> {
    return this.get(this.getRootPath()).map((data: any) => {
      return new Paginable<Priority>(data, this.mapper.bind(this));
    });
  }

  protected getRootPath(): string {
    return '/priorities';
  }

  protected mapper(data: any): Priority {
    return new Priority(data);
  }

}
