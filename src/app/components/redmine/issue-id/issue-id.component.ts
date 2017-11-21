import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../services/redmine/beans';

@Component({
  selector: 'app-issue-id',
  templateUrl: './issue-id.component.html',
  styleUrls: ['./issue-id.component.css']
})
export class IssueIdComponent implements OnInit {

  @Input()
  public issue: Issue;

  constructor() {
  }

  ngOnInit() {
  }

}
