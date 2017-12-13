import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Project} from '../../services/beans';

@Component({
  selector: 'rm-ng-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input()
  public nameFilter: string;
  public internalProject: Project;

  constructor() {
  }

  @Input()
  set project(project: Observable<Project> | Promise<Project> | Project) {
    if (project instanceof Observable) {
      project.subscribe((p) => {
        this.internalProject = p;
      });
    } else if (project instanceof Promise) {
      project.then((p) => {
        this.internalProject = p;
      })
    } else if (project instanceof Project) {
      this.internalProject = project;
    } else {
      throw new Error('Unsupported input type!');
    }
  }

  ngOnInit() {
  }

  isVisible(): boolean {
    if (this.internalProject && this.nameFilter) {
      return this.internalProject.name.toLowerCase().includes(this.nameFilter.toLowerCase())
    } else if (this.internalProject && !this.nameFilter) {
      return true;
    }
    return false;
  }

}
