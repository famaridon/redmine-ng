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
import { RmNgIssueIdComponent } from './components/issue-id/issue-id.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    RmNgProjectComponent,
    RmNgQueryComponent,
    RmNgIssueComponent,
    RmNgIssueIdComponent
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
