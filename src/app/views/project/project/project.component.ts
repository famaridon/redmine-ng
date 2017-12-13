import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RedmineService} from '../../../redmine-ng/services/redmine.service';
import {Project} from '../../../redmine-ng/services/beans';

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

  constructor( router: Router, route: ActivatedRoute, redmine: RedmineService) {
    this.route = route;
    this.router = router;
    this.redmine = redmine;
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
  }
}
