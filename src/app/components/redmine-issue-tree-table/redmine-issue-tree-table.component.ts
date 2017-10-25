import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Issue} from '../../services/redmine/beans';

@Component({
  selector: 'app-redmine-issue-tree-table',
  templateUrl: './redmine-issue-tree-table.component.html',
  styleUrls: ['./redmine-issue-tree-table.component.css']
})
export class RedmineIssueTreeTableComponent implements OnInit, OnChanges {

  @Input()
  public tree: Node<Issue>[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.dir(changes);
  }
}

export class Node<T> {

  public element: T;
  public children: T[];

  constructor(element: T) {
    this.element = element;
    this.children = [];
  }

}
