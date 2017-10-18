import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../settings.service';

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

  public findAll(): any {
    this.http.get(this.server + '/projects.json').subscribe((data) => {
        console.log('ok');
        console.dir(data);
      },
      (err) => {
        console.log('Something went wrong!');
        console.dir(err);
      });
  }

}
