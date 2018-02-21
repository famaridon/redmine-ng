import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SettingsService} from '../../../services/settings.service';
import {Paginable, Status, Version} from '../beans';
import {AbstractRedmineService} from '../abstract.redmine.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VersionsService extends AbstractRedmineService<Version> {

    constructor(http: HttpClient, settings: SettingsService) {
        super(http, settings);
    }

    findByProject(projectId: number): Observable<Paginable<Version>> {
        return this.get(`${this.getRootPath()}/project/${projectId}`).map((data: any) => {
            return new Paginable<Version>(data, this.mapper.bind(this));
        });
    }

    protected getRootPath(): string {
        return '/versions';
    }

    protected mapper(data: any): Version {
        return new Version(data);
    }
}
