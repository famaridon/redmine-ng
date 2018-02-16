import {Injectable} from '@angular/core';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {SettingsService} from '../../../services/settings.service';
import {HttpClient} from '@angular/common/http';
import {Issue, Paginable, Status} from '../beans';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class IssuesService extends AbstractRedmineService<Issue> {

  protected loadedIssues: Map<number, Subject<Issue>> = new Map();

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
  }

  public findByQuery(query: number, project?: number, offset = 0, limit = 50): Observable<Paginable<Observable<Issue>>> {
    let url = `/issues`;
    if (project) {
      url += `/project/${project}`;
    }
    url += `/query/${query}`;
    url += `?offset=${offset}&limit=${limit}`;
    return this.get(url).map((data: any) => {
      return new Paginable<Observable<Issue>>(data, this.caster.bind(this));
    });
  }

  private caster(element): Observable<Issue> {
    return this.asObservable(element.id, new Issue(element));
  }

  public update(issue: Issue): void {

  }

  protected getRootPath(): string {
    return 'issues';
  }

  protected mapper(data: any): Issue {
    return new Issue(data);
  }
}
