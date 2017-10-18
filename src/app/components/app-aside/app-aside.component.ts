import {Component, ElementRef, OnInit} from '@angular/core';
import {RedmineService} from '../../services/redmine.service';
import {Project} from '../../services/redmine/beans';

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html'
})
export class AppAsideComponent implements OnInit {

  private el: ElementRef;
  private redmine: RedmineService;

  public projects: Array<Project>;

  constructor(el: ElementRef, redmine: RedmineService) {
    this.el = el;
    this.redmine = redmine;
  }

  public ngOnInit(): void {
    var nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
    this.redmine.projects.findAll();
  }
}
