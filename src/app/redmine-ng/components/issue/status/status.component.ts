import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../services/beans';

@Component({
  selector: 'rm-ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class RmNgStatusComponent implements OnInit {

  @Input()
  public issue: Issue;

  constructor() {
  }

  ngOnInit() {
  }

}
