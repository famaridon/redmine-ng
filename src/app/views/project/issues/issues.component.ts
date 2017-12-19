import {Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedmineService} from '../../../redmine-ng/services/redmine.service';
import {Subscription} from 'rxjs/Subscription';
import {Issue} from '../../../redmine-ng/services/beans';
import {Node} from '../../../tree-table/node';
import {Observable} from 'rxjs/Observable';
import {RmNgIssueComponent} from '../../../redmine-ng/components/issue/issue.component';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class ProjectQueryIssuesComponent implements OnInit, OnDestroy {

  public nodeById: Map<number, Node<Issue>> = new Map();
  public tree: Array<Node<Issue>>;
  private flatTree: Array<Node<Issue>> = [];
  public projectSubscription: Subscription;
  public querySubscription: Subscription;
  public factory: ComponentFactory<any>;

  constructor(private route: ActivatedRoute, private redmine: RedmineService, private resolver: ComponentFactoryResolver) {
    this.factory = this.resolver.resolveComponentFactory(RmNgIssueComponent);
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
    this.flatTree = [];
    this.nodeById = new Map()
    // first call contain total count
    this.redmine.issues.findByQuery(query, project, 0, 100).subscribe((paginable) => {
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

  private addAll(issues: Observable<Issue>[]): void {
    issues.forEach((obs) => {
      obs.subscribe((issue) => {
        this.addOrUpdate(issue);
      });
    });
  }

  private addOrUpdate(issue: Issue): void {

    let node = this.nodeById.get(issue.id);
    if (node) {
      node.element = issue;
      return;
    } else {
      node = new Node(issue);
      this.nodeById.set(issue.id, node);
    }

    this.flatTree.push(node);
    if (node.element.parent) { // need link to parent
      const parent = this.flatTree.filter((value) => {
        return value.element.id === node.element.parent.id;
      });
      if (parent.length === 0) { // is orphan
        this.tree.push(node);
      } else {
        parent.forEach((value) => {
          value.children.push(node);
        });
      }
    } else {
      this.tree.push(node);
    }
    this.tree.filter((orphan) => {
      if (orphan.element.parent) {
        return node.element.id === orphan.element.parent.id;
      } else {
        return false;
      }
    }).forEach((addopted) => {
      node.children.push(addopted);
      this.tree.splice(this.tree.indexOf(addopted), 1);
    });
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }

}
