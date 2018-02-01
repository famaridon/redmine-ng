import {Injectable} from '@angular/core';
import {Status, Tracker} from '../beans';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../../services/settings.service';
import {Observable} from 'rxjs/Observable';
import {ProjectsService} from '../projects/projects.service';
import 'rxjs/add/operator/publish';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TrackersService extends AbstractRedmineService<Tracker> {

  constructor(http: HttpClient, settings: SettingsService, private projectService: ProjectsService) {
    super(http, settings);
  }

  public findTrackerByProject( project: number): Observable<Array<Tracker>> {
    const subject = new BehaviorSubject<Array<Tracker>>([]);
    this.projectService.find(project).subscribe((p) => {
      subject.next(p.trackers);
    });

    return subject.asObservable();
  }

  protected getRootPath(): string {
    return '/trackers';
  }

  protected mapper(data: any): Tracker {
    return new Tracker(data);
  }
}
