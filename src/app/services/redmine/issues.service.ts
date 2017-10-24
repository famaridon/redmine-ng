import { Injectable } from '@angular/core';
import {AbstractRedmineService} from './abstract.redmine.service';
import {SettingsService} from '../settings.service';
import {HttpClient} from '@angular/common/http';
import {Paginable, Query} from './beans';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IssuesService extends AbstractRedmineService {

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public findByQuery(project: number, query: number, offset = 0, limit = 50): Observable<Paginable<any>> {
    return this.http.get(this.server + `/issues.json?query_id=${query}&project_id=${project}&offset=${offset}&limit=${limit}`).retry(3).map((data: any) => {
      const paginable = new Paginable<Query>();
      paginable.total_count = data.total_count;
      paginable.offset = data.offset;
      paginable.limit = data.limit;
      paginable.elements = data.issues;
      return paginable;
    });
  }

}
