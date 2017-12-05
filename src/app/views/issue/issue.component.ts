import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedmineService} from '../../services/redmine.service';
import {Issue, Status} from '../../services/redmine/beans';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit, OnDestroy {

  public issue: Issue = null;
  public availableStatus: Status[] = [];
  public subscription: Subscription;


  constructor(private route: ActivatedRoute, private redmine: RedmineService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.subscription = this.redmine.issues.find(+params['id']).subscribe((issue) => {
        console.log('issue subscription')
        if (issue == null) {
          return;
        }
        this.issue = issue;
        this.redmine.issues.getAvailableStatus(this.issue.id).subscribe((status) => {
          this.availableStatus = status;
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateSubject(value): void {
    this.issue.subject = value;
    this.redmine.issues.update(this.issue);
  }

  updateStatus(value): void {
    this.issue.status = value;
    this.redmine.issues.update(this.issue);
  }
}
