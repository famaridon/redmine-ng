import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../services/beans';

@Component({
  selector: 'rm-ng-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class RmNgPriorityComponent implements OnInit {

  @Input()
  public issue: Issue;

  constructor() {
  }

  ngOnInit() {
  }

}
