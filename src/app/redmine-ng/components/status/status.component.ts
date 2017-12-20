import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Status} from '../../services/beans';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'rm-ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RmNgStatusComponent),
    multi: true
  }]})
export class RmNgStatusComponent implements OnInit {

  @Input()
  public status: Status;

  constructor() {
  }

  ngOnInit() {
  }

}
