import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedmineService} from '../../../services/redmine.service';
import {Subscription} from 'rxjs/Subscription';
import {Issue} from '../../../services/redmine/beans';
import {Node} from '../../../components/redmine-issue-tree-table/redmine-issue-tree-table.component';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class ProjectQueryIssuesComponent implements OnInit, OnDestroy {

  public tree: Array<Node<Issue>> = [];
  public projectSubscription: Subscription;
  public querySubscription: Subscription;

  constructor(private route: ActivatedRoute, private redmine: RedmineService) {
  }

  ngOnInit() {
    this.projectSubscription = this.route.parent.params.subscribe((parentParam) => {
      const project = parentParam['project'];
      this.querySubscription = this.route.params.subscribe((params) => {
        const query = params['query'];
        this.loadIssues(query, project);
      });
    });
  }

  private loadIssues(query: number, project: number) {
    this.tree = [];
    // first call contain total count
    this.redmine.issues.findByQuery(query, project).subscribe((paginable) => {
      if (paginable.total_count > paginable.elements.length) { // we have more pages
        for (let count = paginable.elements.length; count < paginable.total_count; count += paginable.limit) {
          this.redmine.issues.findByQuery(query, project, count, paginable.limit).subscribe((page) => {
            this.addAll(page.elements);
          });
        }
      }
      this.addAll(paginable.elements);
    });
  }

  private addAll(issues: Issue[]): void {
    issues.forEach((issue) => {
      this.add(issue);
    });
  }

  private add(issue: Issue): void {
    this.tree.push(new Node(issue));
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }

}
