import {Component, Input, OnInit} from '@angular/core';
import {Issue, Status} from '../../../../services/redmine/beans';
import {RedmineService} from '../../../../services/redmine.service';

@Component({
  selector: 'app-rm-status',
  templateUrl: './rm-status.component.html',
  styleUrls: ['./rm-status.component.css']
})
export class RMStatusComponent implements OnInit {

  @Input()
  public issue: Issue;

  @Input()
  public availableStatus: Status[];

  public mode: 'read' | 'write' = 'read';

  constructor(private redmine: RedmineService) {
  }

  ngOnInit() {
    if (this.issue) {
      this.redmine.issues.getAvailableStatus(this.issue.id).subscribe((availableStatus) => {
        this.availableStatus = availableStatus;
      });
    }
  }

  switchMode(): void {
    this.mode = this.mode === 'read' ? 'write' : 'read';
  }

  valueChange(newStatus: Status): void {
  }

  compareFn(i1: Issue, i2: Issue): boolean {
    return i1 && i2 ? i1.id === i2.id : i1 === i2;
  }
}
