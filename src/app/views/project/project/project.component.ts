import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  protected route: ActivatedRoute;
  protected projectId: string;

  constructor(route: ActivatedRoute) {
    this.route = route;
    this.route.params.subscribe( params => this.switchProject(params['project']));
  }

  ngOnInit() {
  }

  private switchProject(projectId: string) {
    this.projectId = projectId;
  }
}
