import {ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedmineService} from '../../services/redmine.service';
import {Issue} from '../../services/redmine/beans';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit, OnDestroy {

  public issue: Issue;
  public subscription: Subscription;

  constructor( private route: ActivatedRoute, private redmine: RedmineService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.redmine.issues.find(params['id']).subscribe((issue) => {
        this.issue = issue;
        this.subscription = this.redmine.issues.asObservable(this.issue).subscribe((next) => {
          this.issue = next;
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
}
