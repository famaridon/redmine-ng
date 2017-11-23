import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../settings.service';
import {Paginable, Project, Tracker} from './beans';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AbstractRedmineService} from './abstract.redmine.service';


@Injectable()
export class ProjectsService extends AbstractRedmineService {

  private currentProject: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
  private currentLoadedProject: Project ;

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
    const projectId = this.settings.getNumber('currentProject');
    if (projectId) {
      this.switchWorkingProject(projectId);
    }
  }

  public find(id: number): Observable<Project> {
    return this.http.get(this.server + `/projects/${id}`).retry(3).map((data: any) => {
      return <Project>data.project;
    });
  }

  public findAll(offset = 0, limit = 50): Observable<Paginable<Project>> {
    return this.http.get(this.server + `/projects?offset=${offset}&limit=${limit}`).retry(3).map((data: any) => {
      const paginable = new Paginable<Project>();
      paginable.total_count = data.total_count;
      paginable.offset = data.offset;
      paginable.limit = data.limit;
      paginable.elements = data.projects;
      return paginable;
    });
  }

  public switchWorkingProject(project: Project | number): void {
    if (typeof project === 'number') {
      this.find(project).subscribe((loadedProject) => {
        this.switchWorkingProject(loadedProject);
      });
    } else {
      this.settings.setNumber('currentProject', project.id);
      this.currentLoadedProject = project;
      this.currentProject.next(project);
    }
  }

  public getWorkingProject(): Observable<Project> {
    return this.currentProject.asObservable();
  }

  public getAvailableTrackers(id: number): Observable<Tracker[]> {
    return this.http.get(this.server + `/projects/${id}/trackers`).retry(3).map((data: any) => {
      return <Tracker[]>data.trackers;
    });
  }

}
