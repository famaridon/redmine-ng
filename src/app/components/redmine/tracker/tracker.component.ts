import {Component, Input, OnInit} from '@angular/core';
import {Tracker} from '../../../services/redmine/beans';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  @Input()
  public tracker: Tracker;

  constructor() {
  }

  ngOnInit() {
  }

}
