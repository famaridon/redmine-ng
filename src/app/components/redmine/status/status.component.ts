import {Component, Input, OnInit, Output} from '@angular/core';
import {Status} from '../../../services/redmine/beans';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @Input()
  @Output()
  public status: Status;

  constructor() {
  }

  ngOnInit() {
  }

}
