import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../../services/settings.service';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {Issue, Status} from '../beans';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StatusService extends AbstractRedmineService<Status> {

  private statusByTracker: Map<number, BehaviorSubject<Status[]>> = new Map();

  constructor(http: HttpClient, settings: SettingsService) {
    super(http, settings);
    this.get(this.getRootPath()).subscribe((statusArray: any[]) => {
      statusArray.forEach((statusJson) => {
        const status = this.mapper(statusJson);
        statusJson.tracker_ids.forEach((tracker_id) => {
          const statusByTrackerSubject = this.findStatusByTrackerSubject(tracker_id);
          const trackerStatus: Status[] = statusByTrackerSubject.getValue();
          statusByTrackerSubject.next(trackerStatus.concat(status));
        });

      });
    });
  }

  private findStatusByTrackerSubject(traker_id) {
    let trackerStatusSubject = this.statusByTracker.get(traker_id);
    if (!trackerStatusSubject) {
      trackerStatusSubject = new BehaviorSubject([]);
      this.statusByTracker.set(traker_id, trackerStatusSubject);
    }
    return trackerStatusSubject;
  }

  public findStatusByTracker(tracker_id: number): Observable<Status[]> {
    const statusByTrackerSubject = this.findStatusByTrackerSubject(tracker_id);
    return statusByTrackerSubject.asObservable();
  }

  protected getRootPath(): string {
    return '/status';
  }

  protected mapper(data: any): Status {
    return new Issue(data);
  }

}
