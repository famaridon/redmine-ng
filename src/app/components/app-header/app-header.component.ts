import {Component, ElementRef, OnInit} from '@angular/core';
import {RedmineService} from '../../services/redmine.service';
import {Project, User} from '../../services/redmine/beans';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  public project: Project;
  public loggedOnUser: User;

  constructor(private el: ElementRef, private redmine: RedmineService) {
    this.project = new Project({});
    this.project.name = 'Select a project.';
  }

  ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);

    this.redmine.projects.getWorkingProject().subscribe((project) => {
      this.project = project;
    });
    this.redmine.users.findLoggedOnUser().subscribe((user) => {
      this.loggedOnUser = user;
    });
  }
}
