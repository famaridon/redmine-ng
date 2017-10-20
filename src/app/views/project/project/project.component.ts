import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedmineService} from '../../../services/redmine.service';
import {Project} from '../../../services/redmine/beans';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public project: Project;
  private redmine: RedmineService;
  protected route: ActivatedRoute;

  constructor(route: ActivatedRoute, redmine: RedmineService) {
    this.route = route;
    this.redmine = redmine;
    this.route.params.subscribe((params) => {
      this.redmine.projects.switchWorkingProject(+params['project']);
    });
    this.redmine.projects.getWorkingProject().subscribe((project) => {
      this.switchProject(project);
    });
  }

  ngOnInit() {
  }

  private switchProject(project: Project) {
    this.project = project;
  }
}
