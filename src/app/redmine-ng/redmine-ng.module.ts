import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RmNgProjectComponent} from './components/project/project.component';
import {RouterModule} from '@angular/router';
import {RmNgQueryComponent} from './components/query/query.component';
import {RedmineService} from './services/redmine.service';
import {IssuesService} from './services/issues/issues.service';
import {ProjectsService} from './services/projects/projects.service';
import {QueriesService} from './services/queries/queries.service';
import {UsersService} from './services/users/users.service';
import {SettingsService} from '../services/settings.service';
import {RmNgIssueComponent} from './components/issue/issue.component';
import {RmNgIssueIdComponent} from './components/issue/issue-id/issue-id.component';
import {StatesInputsModule} from '../states-inputs/states-inputs.module';
import {FormsModule} from '@angular/forms';
import {RmNgStatusComponent} from './components/status/status.component';
import {RmNgPriorityComponent} from './components/priority/priority.component';
import {MomentModule} from 'angular2-moment';
import { RmNgTrackerComponent } from './components/tracker/tracker.component';
import {CACHE, CacheModule} from '@ngx-cache/core';
import {BrowserCacheModule, MemoryCacheService} from '@ngx-cache/platform-browser';
import {TrackersService} from './services/trackers/trackers.service';
import {PrioritiesService} from "./services/priorities/priorities.service";
import { RmNgUserComponent } from './components/user/user.component';
import {GravatarModule} from "ng2-gravatar-directive/src/gravatar.module";
import { RmNgIssueTreeTableRowComponent } from './components/issue/issue-tree-table-row/issue-tree-table-row.component';
import {StatusService} from "./services/status/status.service";

@NgModule({
  imports: [
    CacheModule.forRoot(),
    BrowserCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: MemoryCacheService // or, LocalStorageCacheService
      }
    ]),
    CommonModule,
    RouterModule,
    MomentModule,
    GravatarModule,
    StatesInputsModule,
    FormsModule
  ],
  declarations: [
    RmNgProjectComponent,
    RmNgQueryComponent,
    RmNgIssueComponent,
    RmNgIssueIdComponent,
    RmNgStatusComponent,
    RmNgPriorityComponent,
    RmNgTrackerComponent,
    RmNgUserComponent,
    RmNgIssueTreeTableRowComponent
  ],
  providers: [
    RedmineService,
    IssuesService,
    ProjectsService,
    QueriesService,
    TrackersService,
    PrioritiesService,
    UsersService,
    SettingsService,
    StatusService
  ],
  entryComponents: [
    RmNgIssueTreeTableRowComponent
  ],
  exports: [
    RmNgIssueComponent,
    RmNgProjectComponent,
    RmNgQueryComponent
  ]
})
export class RedmineNgModule {
}
