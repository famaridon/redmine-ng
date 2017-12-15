import {Component, Input, OnInit} from '@angular/core';
import {Tracker} from '../../../services/beans';

@Component({
  selector: 'rm-ng-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class RmNgTrackerComponent implements OnInit {

  @Input()
  public tracker: Tracker;

  constructor() {
  }

  ngOnInit() {
  }

}
