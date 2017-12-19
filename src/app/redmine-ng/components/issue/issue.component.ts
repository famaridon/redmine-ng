/**
 * inspired from https://github.com/DesertFoxNV/ngx-autosize-input
 */

import {Component, Input, OnInit} from '@angular/core';
import {RowComponentReady} from '../../../tree-table/components/row/row.component';
import {Observable} from 'rxjs/Observable';
import {Issue} from '../../services/beans';
import {AbstractRedmineNgBeanComponent} from '../abstract-redmine-ng-bean-component';

@Component({
  selector: 'rm-ng-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class RmNgIssueComponent extends AbstractRedmineNgBeanComponent<Issue> implements OnInit {

  public _issue: Issue;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  @Input()
  set issue(issue: Observable<Issue> | Promise<Issue> | Issue) {
    this.loadBean(issue, (i) => {
      this._issue = i;
    })
  }

  protected getBean(): Issue {
    return this._issue;
  }

  public updateSubject($event) {
    this._issue.subject = $event;
  }

}
