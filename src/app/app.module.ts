/* Angular core modules */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
/* Components */
import {AppComponent} from './app.component';
import {AppLoaderComponent} from './components/app-loader/app-loader.component';
/* Views */
import {ProjectComponent} from './views/project/project/project.component';
import {ProjectQueryIssuesComponent} from './views/project/issues/issues.component';
import {SettingsComponent} from './settings/settings.component';
import {IssueComponent} from './views/issue/issue.component';
/* Services  */
import {SettingsService} from './services/settings.service';
import {SettingsGuardService} from './services/settings-guard.service';
import {AddAPIKeyHeaderInterceptor} from './redmine-ng/services/redmine.service';
/* Pipe */
/* Gravatar */
import {GravatarModule} from 'ng2-gravatar-directive';
/* bootstrap components */
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
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
import {AutofocusDirective} from './directives/autofocus/autofocus.directive';
import {StatesInputsModule} from './states-inputs/states-inputs.module';
import {CommonModule} from '@angular/common';
import {RedmineNgModule} from './redmine-ng/redmine-ng.module';
import {TreeTableModule} from './tree-table/tree-table.module';
import {IssuesRowComponent} from './views/project/issues/issue-row-component.component';


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

    SettingsComponent,
    PageNotFoundComponent,
    ProjectComponent,
    ProjectQueryIssuesComponent,
    IssueComponent,
    IssuesRowComponent,
    AppLoaderComponent,
    AutofocusDirective
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
