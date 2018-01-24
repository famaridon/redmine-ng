import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Observable} from 'rxjs/Observable';
import {Project, User} from '../../../redmine-ng/services/beans';
import {SettingsService} from '../../../services/settings.service';
import {RedmineService} from '../../../redmine-ng/services/redmine.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./app-header.component.css'],
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  private modalRef: BsModalRef;
  public search: string;
  public projects: Observable<Project>[] = [];
  public project: Project;
  public selected: Project;
  public loggedOnUser: User;

  constructor(private settingsService: SettingsService, private redmine: RedmineService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.redmine.projects.getWorkingProject().subscribe((project) => {
      this.project = project;
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.selected = this.project;
    });
    this.redmine.users.findLoggedOnUser().subscribe((user) => {
      this.loggedOnUser = user;
    });

    this.settingsService.getSettings().subscribe((settings) => {
      if (settings && settings.isValide()) {
        this.loadAll();
      } else {
        this.selected = null;
        this.projects = [];
      }
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private loadAll(): void {
    const tmpProjects: Observable<Project>[] = [];
    this.loadPage(tmpProjects, 0, 100);
  }

  private loadPage(tmpProjects: Observable<Project>[], offset: number, limit: number): void {
    const subscription = this.redmine.projects.findAll(offset, limit).subscribe((paginable) => {
      paginable.elements.forEach((element) => {
        tmpProjects.push(element);
      });
      if (paginable.elements.length >= 100) {
        this.loadPage(tmpProjects, offset + limit, limit);
      } else {
        // I'm the last page
        this.projects = tmpProjects;
      }
    });
  }
}
