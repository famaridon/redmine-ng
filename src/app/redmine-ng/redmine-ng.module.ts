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
import {RmNgTrackerComponent} from './components/tracker/tracker.component';
import {PrioritiesService} from './services/priorities/priorities.service';
import {RmNgUserComponent} from './components/user/user.component';
import {RmNgIssueTreeTableRowComponent} from './components/issue/issue-tree-table-row/issue-tree-table-row.component';
import {StatusService} from './services/status/status.service';
import {RealtimeService} from './services/realtime/realtime.service';
import { RmNgIssueModalComponent } from './components/issue/issue-modal/issue-modal.component';
import { RmNgUserAvatarComponent } from './components/user/avatar/user-avatar/user-avatar.component';
import { RmNgVersionComponent } from './components/version/version/version.component';
import {VersionsService} from "./services/versions/versions.service";
import { RmNgCategoryComponent } from './components/category/category/category.component';

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
        RmNgTrackerComponent,
        RmNgUserComponent,
        RmNgIssueTreeTableRowComponent,
        RmNgIssueModalComponent,
        RmNgUserAvatarComponent,
        RmNgVersionComponent,
        RmNgCategoryComponent
    ],
    providers: [
        RedmineService,
        IssuesService,
        ProjectsService,
        QueriesService,
        PrioritiesService,
        UsersService,
        SettingsService,
        StatusService,
        VersionsService,
        RealtimeService
    ],
    entryComponents: [
        RmNgIssueTreeTableRowComponent,
        RmNgIssueComponent,
        RmNgIssueModalComponent
    ],
    exports: [
        RmNgIssueComponent,
        RmNgProjectComponent,
        RmNgQueryComponent,
        RmNgUserAvatarComponent
    ]
})
export class RedmineNgModule {
}
