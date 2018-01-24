import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../../services/settings.service';
import {Paginable, Project} from '../beans';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AbstractRedmineService} from '../abstract.redmine.service';


@Injectable()
export class ProjectsService extends AbstractRedmineService<Project> {

  private currentProject: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
    const projectId = this.settingsService.getNumber('currentProject');
    if (projectId) {
      this.switchWorkingProject(projectId);
    }
  }

  public find( id: number): Observable<Project> {
    const obs = this.findSubject(id);
    obs.filter((p) => { return p ? false : true; } ).subscribe( (p) => {
      this.get(`/${this.getRootPath()}/${id}?include=trackers,issue_categories`).map(this.mapper).subscribe((object) => {
        this.asObservable(id, object);
      });
    })

    return obs;
  }

  public findAll(offset = 0, limit = 50): Observable<Paginable<Observable<Project>>> {
    return this.get(`/projects?offset=${offset}&limit=${limit}`).map((data: any) => {
      return new Paginable<Observable<Project>>(data, this.caster.bind(this));
    });
  }

  public switchWorkingProject(project: Project | number): void {
    if (!project) {
      return;
    }
    if (typeof project === 'number') {
      this.find(project).subscribe((loadedProject) => {
        this.switchWorkingProject(loadedProject);
      });
    } else {
      this.settingsService.setNumber('currentProject', project.id);
      this.currentProject.next(project);
    }
  }

  public getWorkingProject(): Observable<Project> {
    return this.currentProject.asObservable();
  }

  private caster(element: any): Observable<Project> {
    return this.asObservable(element.id, new Project(element));
  }

  protected getRootPath(): string {
    return 'projects';
  }

  protected mapper(data: any): Project {
    return new Project(data);
  }
}
