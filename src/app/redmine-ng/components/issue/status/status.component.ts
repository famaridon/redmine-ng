import {Component, Input, OnInit} from '@angular/core';
import {Status} from '../../../services/beans';

@Component({
  selector: 'rm-ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class RmNgStatusComponent implements OnInit {

  @Input()
  public status: Status;

  constructor() {
  }

  ngOnInit() {
  }

}
