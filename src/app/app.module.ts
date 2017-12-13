/* Angular core modules */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

/* Components */
import {AppComponent} from './app.component';

/* Views */
import {ProjectComponent} from './views/project/project/project.component';
import {ProjectQueryIssuesComponent} from './views/project/issues/issues.component';
import {SettingsComponent} from './views/settings/settings.component';
import {IssueComponent} from './views/issue/issue.component';
import {PageNotFoundComponent} from './views/errors/page-not-found/page-not-found.component';

/* Services  */
import {SettingsService} from './services/settings.service';
import {SettingsGuardService} from './services/settings-guard.service';
import {AddAPIKeyHeaderInterceptor} from './redmine-ng/services/redmine.service';

/* Gravatar */
import {GravatarModule} from 'ng2-gravatar-directive';

/* bootstrap components */
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';

/* Sub modules */
import {StatesInputsModule} from './states-inputs/states-inputs.module';
import {CommonModule} from '@angular/common';
import {RedmineNgModule} from './redmine-ng/redmine-ng.module';
import {TreeTableModule} from './tree-table/tree-table.module';
import {IssuesRowComponent} from './views/project/issues/issue-row-component.component';
import {CoreUiModuleModule} from './core-ui-module/core-ui-module.module';


const appRoutes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {path: '', canActivate: [SettingsGuardService], children: [
      {
        path: 'project/:project', component: ProjectComponent,
        children: [
          {path: 'issues/:query', component: ProjectQueryIssuesComponent}
        ]
      },
      {path: 'issue/:id', component: IssueComponent},
      {
        path: '',
        redirectTo: 'project/last',
        pathMatch: 'full'
      }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,

    SettingsComponent,
    PageNotFoundComponent,
    ProjectComponent,
    ProjectQueryIssuesComponent,
    IssueComponent,
    IssuesRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    GravatarModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    ),
    CoreUiModuleModule,
    StatesInputsModule,
    RedmineNgModule,
    TreeTableModule,
  ],
  entryComponents: [
    IssuesRowComponent
  ],
  providers: [
    SettingsService,
    SettingsGuardService,
    SettingsService,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AddAPIKeyHeaderInterceptor,
      multi: true,
    }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
