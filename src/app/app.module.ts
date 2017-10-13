import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

import {SettingsService} from './services/settings.service';
import {SettingsGuardService} from './services/settings-guard.service';
/* Views */
import {ProjectComponent} from './views/project/project/project.component';
import {SettingsComponent} from './settings/settings.component';
/* Services  */
import {AppSidebarService} from './services/app-sidebar.service';
/* CoreUI components */
import {AppHeader} from './components/app-header/app-header.component';
import {AppSidebar} from './components/app-sidebar/app-sidebar.component';
import {AppSidebarHeader} from './components/app-sidebar-header/app-sidebar-header.component';
import {AppSidebarForm} from './components/app-sidebar-form/app-sidebar-form.component';
import {AppSidebarMinimizer} from './components/app-sidebar-minimizer/app-sidebar-minimizer.component';
import {AppFooter} from './components/app-footer/app-footer.component';
import {AppSidebarFooter} from './components/app-sidebar-footer/app-sidebar-footer.component';
import {AppBreadcrumbs} from './components/app-breadcrumbs/app-breadcrumbs.component';
import {AppAside} from './components/app-aside/app-aside.component';
/* CoreUI directive */
import {AsideToggleDirective} from './directives/aside/aside.directive';
import {BrandMinimizeDirective, MobileSidebarToggleDirective, SidebarMinimizeDirective, SidebarOffCanvasCloseDirective, SidebarToggleDirective} from "./directives/sidebar/sidebar.directive";


import {PageNotFoundComponent} from './errors/page-not-found/page-not-found.component';


const appRoutes: Routes = [
  {path: 'settings', component: SettingsComponent},
  {path: 'project/:project', component: ProjectComponent},
  {
    path: '',
    redirectTo: '/settings',
    pathMatch: 'full'
  },
  {path: '**', canActivate: [SettingsGuardService], component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    AppSidebar,
    AppSidebarHeader,
    AppSidebarForm,
    AppSidebarMinimizer,
    AppFooter,
    AppSidebarFooter,
    AppBreadcrumbs,
    AppAside,

    SidebarOffCanvasCloseDirective,
    BrandMinimizeDirective,
    MobileSidebarToggleDirective,
    SidebarMinimizeDirective,
    SidebarToggleDirective,

    AsideToggleDirective,

    SettingsComponent,
    PageNotFoundComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    )
  ],
  providers: [
    AppSidebarService,
    SettingsService,
    SettingsGuardService
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
