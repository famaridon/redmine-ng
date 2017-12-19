import {Component, Input, OnInit} from '@angular/core';
import {Tracker} from '../../services/beans';
import {RedmineService} from '../../services/redmine.service';
import {SiSelectComponent} from '../../../states-inputs/components/si-select/si-select.component';

@Component({
  selector: 'rm-ng-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class RmNgTrackerComponent extends SiSelectComponent<Tracker> implements OnInit {

  @Input()
  public project: number;

  @Input()
  set tracker(tracker: Tracker) {
    this.value = tracker;
  }

  constructor(private redmine: RedmineService) {
    super();
  }

  ngOnInit() {
    if (this.project) {
      this.availableOptionsObservable = this.redmine.trackers.findTrackerByProject(this.project);
    } else {
      this.availableOptions = [];
    }
    super.ngOnInit();
  }

}
