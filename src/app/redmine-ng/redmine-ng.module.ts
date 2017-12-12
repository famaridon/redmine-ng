import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectComponent} from './components/project/project.component';
import {RouterModule} from '@angular/router';
import {QueryComponent} from './components/query/query.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ProjectComponent, QueryComponent],
  exports: [ProjectComponent, QueryComponent]
})
export class RedmineNgModule {
}
