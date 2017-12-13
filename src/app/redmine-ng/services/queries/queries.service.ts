import {Injectable} from '@angular/core';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../../services/settings.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Paginable, Project, Query} from '../beans';

@Injectable()
export class QueriesService extends AbstractRedmineService<Query> {

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public findAll(offset = 0, limit = 50): Observable<Paginable<Observable<Query>>> {
    return this.get(`/queries?offset=${offset}&limit=${limit}`).map((data: any) => {
      return new Paginable<Observable<Query>>(data, 'queries', this.caster.bind(this));
    });
  }

  private caster(element: any): Observable<Query> {
    return this.asObservable(element.id, new Query(element));
  }

  protected getRootPath(): string {
    return 'queries';
  }

  protected mapper(data: any): Query {
    return new Query(data.query);
  }
}
