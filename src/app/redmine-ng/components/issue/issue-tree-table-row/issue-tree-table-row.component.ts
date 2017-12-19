import { Component, OnInit } from '@angular/core';
import {RmNgIssueComponent} from '../issue.component';
import {Issue} from '../../../services/beans';
import {Observable} from 'rxjs/Observable';
import {RowComponentReady} from '../../../../tree-table/components/row/row.component';

@Component({
  selector: 'rm-ng-issue-tree-table-row',
  templateUrl: './issue-tree-table-row.component.html',
  styleUrls: ['./issue-tree-table-row.component.css']
})
export class RmNgIssueTreeTableRowComponent extends RmNgIssueComponent implements OnInit, RowComponentReady<Observable<Issue> | Promise<Issue> | Issue> {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  setElement(element: Observable<Issue> | Promise<Issue> | Issue): void {
    this.issue = element;
  }

}
