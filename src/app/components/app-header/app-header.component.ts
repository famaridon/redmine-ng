import {Component, OnInit, TemplateRef} from '@angular/core';
import {RedmineService} from '../../services/redmine.service';
import {Project, User} from '../../services/redmine/beans';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  styleUrls: ['./app-header.component.css'],
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit {

  private modalRef: BsModalRef;
  public search: string;
  public projects: Project[] = [];
  public project: Project;
  public selected: Project;
  public loggedOnUser: User;

  constructor(private redmine: RedmineService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.redmine.projects.getWorkingProject().subscribe((project) => {
      this.project = project;
    });
    this.redmine.users.findLoggedOnUser().subscribe((user) => {
      this.loggedOnUser = user;
    });

    this.loadAll();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
    this.modalRef.hide();
  }
}
