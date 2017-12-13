import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppAsideComponent} from './components/app-aside/app-aside.component';
import {AppBreadcrumbsComponent} from './components/app-breadcrumbs/app-breadcrumbs.component';
import {AppFooterComponent} from './components/app-footer/app-footer.component';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {AppLoaderComponent} from './components/app-loader/app-loader.component';
import {AppSidebarComponent} from './components/app-sidebar/app-sidebar.component';
import {AppSidebarFooterComponent} from './components/app-sidebar-footer/app-sidebar-footer.component';
import {AppSidebarFormComponent} from './components/app-sidebar-form/app-sidebar-form.component';
import {AppSidebarHeaderComponent} from './components/app-sidebar-header/app-sidebar-header.component';
import {AppSidebarMinimizerComponent} from './components/app-sidebar-minimizer/app-sidebar-minimizer.component';
import {RedmineNgModule} from '../redmine-ng/redmine-ng.module';
import {RouterModule} from '@angular/router';
import {GravatarModule} from 'ng2-gravatar-directive';
import {FormsModule} from '@angular/forms';
import {AsideToggleDirective} from './directives/aside/aside.directive';
import {NavDropdownDirective, NavDropdownToggleDirective} from './directives/nav-dropdown/nav-dropdown.directive';
import {BrandMinimizeDirective, MobileSidebarToggleDirective, SidebarDropdownToggleDirective, SidebarMinimizeDirective, SidebarOffCanvasCloseDirective, SidebarToggleDirective} from './directives/sidebar/sidebar.directive';

@NgModule({
  imports: [
    CommonModule,
    RedmineNgModule,
    RouterModule,
    GravatarModule,
    FormsModule
  ],
  declarations: [
    AsideToggleDirective,

    NavDropdownDirective,
    NavDropdownToggleDirective,

    SidebarToggleDirective,
    SidebarMinimizeDirective,
    BrandMinimizeDirective,
    MobileSidebarToggleDirective,
    SidebarOffCanvasCloseDirective,
    SidebarDropdownToggleDirective,


    AppAsideComponent,
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppLoaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent
  ],
  exports: [
    AsideToggleDirective,

    NavDropdownDirective,
    NavDropdownToggleDirective,

    SidebarToggleDirective,
    SidebarMinimizeDirective,
    BrandMinimizeDirective,
    MobileSidebarToggleDirective,
    SidebarOffCanvasCloseDirective,
    SidebarDropdownToggleDirective,

    AppAsideComponent,
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppLoaderComponent,
    AppSidebarComponent,
    AppSidebarFooterComponent,
    AppSidebarFormComponent,
    AppSidebarHeaderComponent,
    AppSidebarMinimizerComponent
  ]
})

export class CoreUiModuleModule {
}
