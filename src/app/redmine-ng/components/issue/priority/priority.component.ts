import {Component, Input, OnInit} from '@angular/core';
import {Priority} from '../../../services/beans';

@Component({
  selector: 'rm-ng-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class RmNgPriorityComponent implements OnInit {

  @Input()
  public priority: Priority;

  constructor() {
  }

  ngOnInit() {
  }

}
