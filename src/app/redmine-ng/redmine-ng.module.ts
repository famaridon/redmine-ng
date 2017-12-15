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
import {RmNgStatusComponent} from './components/issue/status/status.component';
import {RmNgPriorityComponent} from './components/issue/priority/priority.component';
import {MomentModule} from 'angular2-moment';
import { RmNgTrackerComponent } from './components/issue/tracker/tracker.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MomentModule,
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
    RmNgTrackerComponent
  ],
  providers: [
    RedmineService,
    IssuesService,
    ProjectsService,
    QueriesService,
    UsersService,
    SettingsService
  ],
  entryComponents: [
    RmNgIssueComponent
  ],
  exports: [
    RmNgProjectComponent,
    RmNgQueryComponent
  ]
})
export class RedmineNgModule {
}
