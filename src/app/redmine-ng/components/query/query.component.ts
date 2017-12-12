import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {AbstractRedmineComponent} from '../abstract-redmine-ng-component';
import {Project, Query} from '../../../services/redmine/beans';

@Component({
  selector: 'rm-ng-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent extends AbstractRedmineComponent<Query> implements OnInit {

  private projectFilter: number;

  constructor(private el: ElementRef) {
    super();
    el.nativeElement.parentElement.classList.add()
  }

  @Input()
  set project(project: number | Project) {
    if (project instanceof Project) {
      this.projectFilter = project.id;
    } else if (typeof project === 'number') {
      this.projectFilter = project;
    }
    if(this.isVisible() && this.el.nativeElement.parentElement.tagName === 'LI') {
      this.el.nativeElement.parentElement.classList.remove('d-none');
    } else {
      this.el.nativeElement.parentElement.classList.add('d-none');
    }
  }

  ngOnInit() {
  }


  public getRouterLink(): string {
    return `/project/${this.internalBean.project_id}/issues/${this.internalBean.id}`;
  }

  public isVisible(): boolean {
    return super.isVisible() && this.internalBean.project_id === this.projectFilter;
  }
}
