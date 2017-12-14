import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../services/beans';

@Component({
  selector: 'rm-ng-issue-id',
  templateUrl: './issue-id.component.html',
  styleUrls: ['./issue-id.component.css']
})
export class RmNgIssueIdComponent implements OnInit {


  @Input()
  public issue: Issue;

  constructor() { }

  ngOnInit() {
  }

}
