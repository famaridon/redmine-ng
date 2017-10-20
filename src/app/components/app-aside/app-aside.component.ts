import {Component, ElementRef, OnInit} from '@angular/core';
import {RedmineService} from '../../services/redmine.service';
import {Project} from '../../services/redmine/beans';

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html',
  styleUrls: ['./app-aside.component.css']
})
export class AppAsideComponent implements OnInit {

  private el: ElementRef;
  private redmine: RedmineService;

  public projects: Array<Project>;
  public selected: Project;

  constructor(el: ElementRef, redmine: RedmineService) {
    this.el = el;
    this.redmine = redmine;
    this.projects = [];
  }

  public ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
    this.loadAll();
  }

  public async loadAll(): Promise<void> {
    let paginable = await this.redmine.projects.findAll(0, 100).toPromise();
    this.projects = this.projects.concat(paginable.elements);
    while (paginable.elements.length === 100) {
      paginable = await this.redmine.projects.findAll(paginable.offset + paginable.elements.length, 100).toPromise();
      this.projects = this.projects.concat(paginable.elements);
    }
  }

  public select(selected: Project): void {
    this.selected = selected;
    this.redmine.projects.switchWorkingProject(this.selected);
  }

}
