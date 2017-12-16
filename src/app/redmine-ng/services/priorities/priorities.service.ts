import {Injectable} from '@angular/core';
import {Priority} from '../beans';
import {HttpClient} from '@angular/common/http';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {SettingsService} from '../../../services/settings.service';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PrioritiesService extends AbstractRedmineService<Priority> {

  private priorities = new BehaviorSubject(null);

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
    this.get(this.getRootPath()).map((data) => {
      const arr: Array<Priority> = [];
      data.forEach((p) => {
        arr.push(this.mapper(p));
      });
      return arr;
    }).subscribe((p) => {
      this.priorities.next(p);
    });
  }

  public findAll(): Observable<Array<Priority>> {
    return this.priorities.asObservable();
  }

  protected getRootPath(): string {
    return '/priorities';
  }

  protected mapper(data: any): Priority {
    return new Priority(data);
  }

}
