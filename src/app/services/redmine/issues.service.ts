import {Injectable} from '@angular/core';
import {AbstractRedmineService} from './abstract.redmine.service';
import {SettingsService} from '../settings.service';
import {HttpClient} from '@angular/common/http';
import {Issue, Paginable} from './beans';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IssuesService extends AbstractRedmineService {

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public findByQuery(query: number, project?: number, offset = 0, limit = 50): Observable<Paginable<Issue>> {
    let url = this.server;
    url += `/issues?query_id=${query}`;
    if (project) {
      url += `&project_id=${project}`;
    }
    url += `&offset=${offset}&limit=${limit}`;
    return this.http.get(url).retry(3).map((data: any) => {
      const paginable = new Paginable<Issue>();
      paginable.total_count = data.total_count;
      paginable.offset = data.offset;
      paginable.limit = data.limit;
      paginable.elements = data.issues;
      return paginable;
    });
  }

  public find(id: number): Observable<Issue> {
    return this.http.get(this.server + `/issues/${id}`).retry(3).map((data: any) => {
      return <Issue>data.issue;
    });
  }

}
