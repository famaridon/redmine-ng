import {Injectable} from '@angular/core';
import {ProjectsService} from './redmine/projects.service';
import {IssuesService} from './redmine/issues.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SettingsService} from "./settings.service";
import {QueriesService} from "./redmine/queries.service";

/**
 * this is simply a service aggregator
 */
@Injectable()
export class RedmineService {

  constructor(private settings: SettingsService,
              public projects: ProjectsService,
              public issues: IssuesService,
              public queries: QueriesService) {
  }

}

@Injectable()
export class AddAPIKeyHeaderInterceptor implements HttpInterceptor {


  constructor(private settings: SettingsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header
    const clonedRequest = req.clone({headers: req.headers.set('X-Redmine-API-Key', this.settings.getString('apiKey'))});

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}
