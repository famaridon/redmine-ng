import {Component, Input, OnInit} from '@angular/core';
import {Tracker} from '../../../services/beans';
import {RedmineService} from '../../../services/redmine.service';

@Component({
  selector: 'rm-ng-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class RmNgTrackerComponent implements OnInit {

  @Input()
  public tracker: Tracker;
  @Input()
  public project: number;
  public trackers: Tracker[];

  constructor(private redmine: RedmineService) {
  }

  ngOnInit() {
    if (this.project) {
      this.redmine.trackers.findTrackerByProject(this.project).subscribe((ts) => {
        console.log('RmNgTrackerComponent.subscribe');
        this.trackers = ts;
      });
    } else {
      this.trackers = [];
    }
  }

}
