import {Injectable} from '@angular/core';
import {ProjectsService} from './projects/projects.service';
import {IssuesService} from './issues/issues.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {QueriesService} from './queries/queries.service';
import {UsersService} from './users/users.service';
import {Settings, SettingsService} from '../../services/settings.service';
import {TrackersService} from './trackers/trackers.service';

/**
 * this is simply a service aggregator
 */
@Injectable()
export class RedmineService {

  constructor(private settings: SettingsService,
              public projects: ProjectsService,
              public issues: IssuesService,
              public queries: QueriesService,
              public users: UsersService,
              public trackers: TrackersService) {
  }

}

@Injectable()
export class AddAPIKeyHeaderInterceptor implements HttpInterceptor {

  private settings: Settings;

  constructor(private settingsService: SettingsService) {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({headers: req.headers.set('X-Redmine-API-Key', this.settings.api_key)});

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
