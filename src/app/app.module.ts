/* Angular core modules */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
/* Components */
import {AppComponent} from './app.component';
import {RedmineIssuesComponent} from './component/redmine-issues/redmine-issues.component';
/* Views */
import {ProjectComponent} from './views/project/project/project.component';
import {ProjectQueryIssuesComponent} from './views/project/issues/issues.component';
import {SettingsComponent} from './settings/settings.component';
/* Services  */
import {AppSidebarService} from './services/app-sidebar.service';
import {SettingsService} from './services/settings.service';
import {SettingsGuardService} from './services/settings-guard.service';
import {AddAPIKeyHeaderInterceptor, RedmineService} from './services/redmine.service';
import {ProjectsService} from './services/redmine/projects.service';
import {IssuesService} from './services/redmine/issues.service';
import {QueriesService} from './services/redmine/queries.service';
import {UsersService} from './services/redmine/users.service';
/* Pipe */
import {NameFilterPipe} from './services/redmine/beans';
/* Gravatar */
import {GravatarModule} from 'ng2-gravatar-directive';
/* CoreUI components */
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {AppSidebarComponent} from './components/app-sidebar/app-sidebar.component';
import {AppSidebarHeader} from './components/app-sidebar-header/app-sidebar-header.component';
import {AppSidebarForm} from './components/app-sidebar-form/app-sidebar-form.component';
import {AppSidebarMinimizer} from './components/app-sidebar-minimizer/app-sidebar-minimizer.component';
import {AppFooter} from './components/app-footer/app-footer.component';
import {AppSidebarFooter} from './components/app-sidebar-footer/app-sidebar-footer.component';
import {AppBreadcrumbs} from './components/app-breadcrumbs/app-breadcrumbs.component';
import {AppAsideComponent} from './components/app-aside/app-aside.component';
/* CoreUI directive */
import {AsideToggleDirective} from './directives/aside/aside.directive';
import {BrandMinimizeDirective, MobileSidebarToggleDirective, SidebarDropdownToggleDirective, SidebarMinimizeDirective, SidebarOffCanvasCloseDirective, SidebarToggleDirective} from './directives/sidebar/sidebar.directive';
import {NavDropdownDirective, NavDropdownToggleDirective} from './directives/nav-dropdown/nav-dropdown.directive';

import {PageNotFoundComponent} from './errors/page-not-found/page-not-found.component';
import {RedmineIssueTreeTableComponent} from './components/redmine-issue-tree-table/redmine-issue-tree-table.component';
import {RedmineIssueComponent} from './components/redmine-issue-tree-table/redmine-issue.component';


const appRoutes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {
    path: 'project/:project', component: ProjectComponent,
    children: [
      {path: 'issues/:query', component: ProjectQueryIssuesComponent}
    ]
  },
  {
    path: '',
    redirectTo: 'project/last',
    pathMatch: 'full'
  },
  {path: '**', canActivate: [SettingsGuardService], component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppSidebarHeader,
    AppSidebarForm,
    AppSidebarMinimizer,
    AppFooter,
    AppSidebarFooter,
    AppBreadcrumbs,
    AppAsideComponent,

    SidebarOffCanvasCloseDirective,
    BrandMinimizeDirective,
    MobileSidebarToggleDirective,
    SidebarMinimizeDirective,
    SidebarToggleDirective,
    SidebarDropdownToggleDirective,

    AsideToggleDirective,

    NavDropdownDirective,
    NavDropdownToggleDirective,

    NameFilterPipe,

    SettingsComponent,
    PageNotFoundComponent,
    ProjectComponent,
    RedmineIssuesComponent,
    ProjectQueryIssuesComponent,
    RedmineIssueComponent,
    RedmineIssueTreeTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    GravatarModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [
    AppSidebarService,
    SettingsService,
    SettingsGuardService,
    RedmineService,
    ProjectsService,
    QueriesService,
    UsersService,
    IssuesService,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AddAPIKeyHeaderInterceptor,
      multi: true,
    }]
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
