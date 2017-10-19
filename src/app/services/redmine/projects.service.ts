import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../settings.service';
import {Paginable, Project} from './beans';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {

  private http: HttpClient
  private settings: SettingsService;
  private server: string;

  constructor(http: HttpClient, settings: SettingsService) {
    this.http = http;
    this.settings = settings;
    this.server = this.settings.getString('server');
  }

  public findAll(offset = 0 , limit = 50): Observable<Paginable<Project>> {
    return this.http.get(this.server + `/projects.json?offset=${offset}&limit=${limit}`).retry(3).map((data: any) => {
      const paginable = new Paginable<Project>();
      paginable.total_count = data.total_count;
      paginable.offset = data.offset;
      paginable.limit = data.limit;
      paginable.elements = data.projects;
      return paginable;
    });
  }

}
