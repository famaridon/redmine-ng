import {Injectable} from '@angular/core';
import {AbstractRedmineService} from './abstract.redmine.service';
import {SettingsService} from '../settings.service';
import {HttpClient} from '@angular/common/http';
import {Issue, Paginable, Status} from './beans';
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
    this.socket.emit('issue', {message: 'reading issue #' + id})
    return this.http.get(this.server + `/issues/${id}`).retry(3).map((data: any) => {
      const issue = new Issue();
      Object.assign(issue, data.issue);
      // issue.start_date = new Date(issue.start_date);
      // issue.due_date = new Date(issue.due_date);
      issue.start_date = new Date();
      issue.due_date = new Date();
      return issue;
    });
  }

  public getAvailableStatus(id: number): Observable<Status[]> {
    return this.http.get(this.server + `/issues/${id}/status`).retry(3).map((data: any) => {
      return <Status[]>data.status;
    });
  }

  protected getNamspaceName(): string {
    return '/issues';
  }
}
