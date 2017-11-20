import {Injectable} from '@angular/core';
import {AbstractRedmineService} from './abstract.redmine.service';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../settings.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Paginable, Project, Query} from './beans';

@Injectable()
export class QueriesService extends AbstractRedmineService {

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public findAll(offset = 0, limit = 50): Observable<Paginable<Query>> {
    return this.http.get(this.server + `/queries?offset=${offset}&limit=${limit}`).retry(3).map((data: any) => {
      const paginable = new Paginable<Query>();
      paginable.total_count = data.total_count;
      paginable.offset = data.offset;
      paginable.limit = data.limit;
      paginable.elements = data.queries;
      return paginable;
    });
  }

  public async findByProject(project: Project | number, offset = 0, limit = 50): Promise<Array<Query>> {
    let result = [];
    let paginable = await this.findAll(0, 100).toPromise();
    result = result.concat(paginable.elements)
    while (paginable.elements.length === 100) {
      paginable = await this.findAll(paginable.offset + paginable.elements.length, 100).toPromise();
      result = result.concat(paginable.elements);
    }
    return result.filter((query: Query) => {
      return query.project_id === project;
    });
  }

}
