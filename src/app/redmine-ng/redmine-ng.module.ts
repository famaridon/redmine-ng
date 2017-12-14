import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectComponent} from './components/project/project.component';
import {RouterModule} from '@angular/router';
import {QueryComponent} from './components/query/query.component';
import {RedmineService} from './services/redmine.service';
import {IssuesService} from './services/issues/issues.service';
import {ProjectsService} from './services/projects/projects.service';
import {QueriesService} from './services/queries/queries.service';
import {UsersService} from './services/users/users.service';
import {SettingsService} from '../services/settings.service';
import {IssueComponent} from './components/issue/issue.component';
import { IssueIdComponent } from './components/issue-id/issue-id.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProjectComponent,
    QueryComponent,
    IssueComponent,
    IssueIdComponent
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
    IssueComponent
  ],
  exports: [
    ProjectComponent,
    QueryComponent
  ]
})
export class RedmineNgModule {
}
