import {Injectable} from '@angular/core';
import {AbstractRedmineService} from './abstract.redmine.service';
import {SettingsService} from '../settings.service';
import {HttpClient} from '@angular/common/http';
import {Issue, Paginable, Status} from './beans';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class IssuesService extends AbstractRedmineService {

  protected loadedIssues: Map<number, Subject<Issue>> = new Map();

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
    this.socket.on('update', (issue) => {
      this.notifyAll(this.loadIssueJson(issue));
    });
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
    this.socket.emit('issue', {message: 'reading issue #' + id});
    return this.http.get(this.server + `/issues/${id}`).retry(3).map((data: any) => {
      return this.loadIssueJson(data.issue);
    });
  }

  public getAvailableStatus(id: number): Observable<Status[]> {
    return this.http.get(this.server + `/issues/${id}/status`).retry(3).map((data: any) => {
      return <Status[]>data.status;
    });
  }

  private notifyAll(issue: Issue): void {
    const subject: Subject<Issue> = this.loadedIssues.get(issue.id);
    if (subject) {
      console.log(`notify all #${issue.id}`);
      subject.next(issue);
    }
  }

  private loadIssueJson(jsonIssue: any): Issue {
    const issue = new Issue();
    Object.assign(issue, jsonIssue);
    issue.start_date = new Date();
    issue.due_date = new Date();
    return issue;
  }

  public asObservable(issue: Issue): Observable<Issue> {
    let subject: Subject<Issue> = this.loadedIssues.get(issue.id);
    if (!subject) {
      subject = new BehaviorSubject(issue);
      this.loadedIssues.set(issue.id, subject);
    }

    return subject.asObservable();
  }

  public update(issue: Issue): void {
    this.socket.emit('update', issue);
  }

  protected getNamspaceName(): string {
    return '/issues';
  }
}
