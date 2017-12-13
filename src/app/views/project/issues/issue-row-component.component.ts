import {Component, OnInit} from '@angular/core';
import {Issue} from '../../../redmine-ng/services/beans';
import {AbstractRowComponentComponent} from '../../../tree-table/row/abstract-row-component.component';


@Component({
  selector: 'app-issue-row-component',
  templateUrl: './issue-row-component.component.html',
  styleUrls: []
})
export class IssuesRowComponent extends AbstractRowComponentComponent<Issue> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {

  }


}
