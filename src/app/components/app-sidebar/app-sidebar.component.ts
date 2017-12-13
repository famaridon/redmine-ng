import {Component, ElementRef, OnInit} from '@angular/core';
import {RedmineService} from '../../redmine-ng/services/redmine.service';
import {Project, Query} from '../../redmine-ng/services/beans';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebarComponent implements OnInit {

  public workingProject: Project;
  public queries: Observable<Query>[] = [];

  constructor(private redmine: RedmineService) {
    this.redmine.projects.getWorkingProject().subscribe((wp) => {
      this.workingProject = wp;
    });

    this.loadAllQueries();
  }

  private loadAllQueries(): void {
    const tmp: Observable<Query>[] = [];
    this.loadPage(tmp, 0, 100);
  }

  private loadPage(tmp: Observable<Query>[], offset: number, limit: number): void {
    this.redmine.queries.findAll(offset, limit).subscribe((paginable) => {
      paginable.elements.forEach((element) => {
        tmp.push(element);
      });
      if (paginable.elements.length >= 100) {
        this.loadPage(tmp, offset + limit, limit);
      } else {
        // I'm the last page
        this.queries = tmp;
      }
    });
  }

  public ngOnInit(): void {

  }
}
