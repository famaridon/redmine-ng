import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedmineService} from '../../services/redmine.service';
import {Issue} from '../../services/redmine/beans';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  public issue: Issue;

  constructor(private route: ActivatedRoute, private redmine: RedmineService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.redmine.issues.find(params['id']).subscribe((issue) => {
        this.issue = issue;
      });
    });
  }

}
