import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedmineService} from '../../redmine-ng/services/redmine.service';
import {Issue, Status} from '../../redmine-ng/services/beans';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit, OnDestroy {

  public issue: Issue = null;
  public subscription: Subscription;


  constructor(private route: ActivatedRoute, private redmine: RedmineService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.subscription = this.redmine.issues.find(+params['id']).subscribe((issue) => {
        if (issue == null) {
          return;
        }
        this.issue = issue;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
