import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RedmineService} from '../../../services/redmine.service';
import {Project} from '../../../services/redmine/beans';
import {AppSidebarService, Entry} from '../../../services/app-sidebar.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public project: Project;
  private redmine: RedmineService;
  protected route: ActivatedRoute;
  protected router: Router;
  protected sidebarService: AppSidebarService;

  constructor(sidebarService: AppSidebarService, router: Router, route: ActivatedRoute, redmine: RedmineService) {
    this.route = route;
    this.router = router;
    this.redmine = redmine;
    this.sidebarService = sidebarService;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const param = params['project'];
      if (param === 'last') {
        this.redmine.projects.getWorkingProject().subscribe((project) => {
          if (project) {
            this.router.navigateByUrl(`/project/${project.id}`);
          }
        });
      } else {
        this.redmine.projects.switchWorkingProject(+params['project']);
      }
    });
    this.redmine.projects.getWorkingProject().subscribe((project) => {
      this.switchProject(project);
    });
  }

  private switchProject(project: Project) {
    if (!project) {
      return;
    }
    this.project = project;
    this.redmine.queries.findByProject(this.project.id).then((queries) => {
      const queriesEntry = [];

      queries.forEach((query) => {
        const queryEntry = new Entry(String(query.id), query.name);
        queryEntry.link = `/project/${this.project.id}/issues/${query.id}`;
        queriesEntry.push(queryEntry);
      });

      this.sidebarService.findEntry('project').entries = queriesEntry;
    });
  }
}
