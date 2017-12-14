import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Project, Query} from '../../services/beans';
import {Observable} from 'rxjs/Observable';
import {AbstractRedmineNgBeanComponent} from '../abstract-redmine-ng-bean-component';

@Component({
  selector: 'rm-ng-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class RmNgQueryComponent extends AbstractRedmineNgBeanComponent<Query> implements OnInit {

  private projectFilter: number;
  private _query: Query;

  constructor(private el: ElementRef) {
    super();
    el.nativeElement.parentElement.classList.add()
  }

  @Input()
  set query(query: Observable<Query> | Promise<Query> | Query) {
    this.loadBean(query, (q) => {
      this._query = q;
    });
  }

  @Input()
  set project(project: number | Project) {
    if (project instanceof Project) {
      this.projectFilter = project.id;
    } else if (typeof project === 'number') {
      this.projectFilter = project;
    }
    if (this.isVisible() && this.el.nativeElement.parentElement.tagName === 'LI') {
      this.el.nativeElement.parentElement.classList.remove('d-none');
    } else {
      this.el.nativeElement.parentElement.classList.add('d-none');
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected getBean(): Query {
    return this._query;
  }

  public getRouterLink(): string {
    return `/project/${this._query.project_id}/issues/${this._query.id}`;
  }

  public isVisible(): boolean {
    return super.isVisible() && this._query.project_id === this.projectFilter;
  }
}
