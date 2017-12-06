import {Injectable} from '@angular/core';
import {AbstractRedmineService} from './abstract.redmine.service';
import {SettingsService} from '../settings.service';
import {HttpClient} from '@angular/common/http';
import {Issue, Paginable, Status} from './beans';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class IssuesService extends AbstractRedmineService<Issue> {

  protected loadedIssues: Map<number, Subject<Issue>> = new Map();

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
    this.socket.on('update', (issue) => {
      console.dir(this.loadedIssues);
      this.notifyAll(new Issue(issue));
    });
  }

  public findByQuery(query: number, project?: number, offset = 0, limit = 50): Observable<Paginable<Observable<Issue>>> {
    let url = '';
    url += `/issues?query_id=${query}`;
    if (project) {
      url += `&project_id=${project}`;
    }
    url += `&offset=${offset}&limit=${limit}`;
    return this.get(url).map((data: any) => {
      return new Paginable<Observable<Issue>>(data, 'issues', this.caster);
    });
  }

  public getAvailableStatus(id: number): Observable<Status[]> {
    return this.get(`/issues/${id}/status`).map((data: any) => {
      const statusList = new Array<Status>();
      for (let i = 0; i < data.status.length; i++) {
        statusList.push(new Status(data.status[i]));
      }
      return statusList;
    });
  }

  private caster(element): Observable<Issue> {
    return this.asObservable(element.id, new Issue(element));
  }

  public update(issue: Issue): void {
    this.socket.emit('update', issue);
  }

  protected getNamspaceName(): string {
    return '/issues';
  }

  protected getRootPath(): string {
    return 'issues';
  }

  protected mapper(data: any): Issue {
    return new Issue(data.issue);
  }
}
