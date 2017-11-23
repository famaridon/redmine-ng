import {Component, Input, OnInit} from '@angular/core';
import {Issue, Tracker} from '../../../../services/redmine/beans';
import {RedmineService} from '../../../../services/redmine.service';

@Component({
  selector: 'app-rm-tracker',
  templateUrl: './rm-tracker.component.html',
  styleUrls: ['./rm-tracker.component.css']
})
export class RmTrackerComponent implements OnInit {

  @Input()
  public issue: Issue;
  public availableTrackers: Tracker[] = null;

  public mode: 'read' | 'write' = 'read';

  constructor(private redmine: RedmineService) {
  }

  ngOnInit() {
  }

  switchMode(): void {
    if (this.availableTrackers == null) {
      this.redmine.projects.getAvailableTrackers(this.issue.project.id).subscribe((trackers) => {
        this.availableTrackers = trackers;
        this.mode = this.mode === 'read' ? 'write' : 'read';
      })
    } else {
      this.mode = this.mode === 'read' ? 'write' : 'read';
    }
  }

  valueChange(newTracker: Tracker): void {
  }

  compareFn(t1: Tracker, t2: Tracker): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
