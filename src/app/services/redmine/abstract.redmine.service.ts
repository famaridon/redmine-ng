import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../settings.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';

@Injectable()
export abstract class AbstractRedmineService {

  protected http: HttpClient
  protected settings: SettingsService;
  protected server: string;

  constructor(http: HttpClient, settings: SettingsService) {
    this.http = http;
    this.settings = settings;
    this.server = this.settings.getString('server');
  }

}
