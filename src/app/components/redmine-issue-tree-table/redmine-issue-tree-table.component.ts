import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Issue} from '../../services/redmine/beans';

@Component({
  selector: 'app-redmine-issue-tree-table',
  templateUrl: './redmine-issue-tree-table.component.html',
  styleUrls: ['./redmine-issue-tree-table.component.css']
})
export class RedmineIssueTreeTableComponent implements OnInit, OnChanges {

  @Input()
  public tree: Node<Issue>[];

  constructor(private ref: ElementRef) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}

export class Node<T> {

  public element: T;
  public children: Node<T>[];

  constructor(element: T) {
    this.element = element;
    this.children = [];
  }

}
