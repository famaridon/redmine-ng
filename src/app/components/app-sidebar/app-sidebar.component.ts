import {Component, ElementRef, OnInit} from '@angular/core';
import {RedmineService} from '../../services/redmine.service';
import {Project, Query} from '../../services/redmine/beans';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebarComponent implements OnInit {

  public workingProject: Project;
  public queries: Observable<Query>[] = [];

  constructor(private redmine: RedmineService, private el: ElementRef) {
    this.redmine.projects.getWorkingProject().subscribe((wp) => {
      this.workingProject = wp;
    });

    this.redmine.queries.findAll(0, 100).subscribe((page) => {
      this.queries = this.queries.concat(page.elements);
    });
  }

  // wait for the component to render completely
  public ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
