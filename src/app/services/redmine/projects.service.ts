import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../settings.service';
import {Paginable, Project} from './beans';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ProjectsService {


  private currentProject = new Subject<Project>();

  private http: HttpClient
  private settings: SettingsService;
  private server: string;

  constructor(http: HttpClient, settings: SettingsService) {
    this.http = http;
    this.settings = settings;
    this.server = this.settings.getString('server');
    const projectId = this.settings.getNumber('currentProject');
    if (projectId) {
      this.switchWorkingProject(projectId);
    }
  }

  public find(id: number): Observable<Project> {
    return this.http.get(this.server + `/projects/${id}.json`).retry(3).map((data: any) => {
      return <Project>data.project;
    });
  }

  public findAll(offset = 0, limit = 50): Observable<Paginable<Project>> {
    return this.http.get(this.server + `/projects.json?offset=${offset}&limit=${limit}`).retry(3).map((data: any) => {
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
      this.currentProject.next(project);
    }
  }

  public getWorkingProject(): Observable<Project> {
    return this.currentProject.asObservable();
  }

}
