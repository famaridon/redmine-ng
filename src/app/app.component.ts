import {Component} from '@angular/core';
import {AppSidebarService, Entry} from './services/app-sidebar.service';
import {RedmineService} from "./services/redmine.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private sidebarService: AppSidebarService;
  private redmine: RedmineService;

  protected projectEntry: Entry;
  protected settingsEntry: Entry;

  constructor(sidebarService: AppSidebarService, redmine: RedmineService) {
    this.sidebarService = sidebarService;
    this.redmine = redmine;


    this.redmine.projects.getWorkingProject().subscribe((project) => {
      if (!this.projectEntry) {
        this.projectEntry = this.sidebarService.addEntry('Project');
      }

      this.projectEntry.icon = 'building';
      this.projectEntry.link = `/project/${project.id}`;
    });


    const settingsEntry: Entry = this.sidebarService.addEntry('Settings');
    settingsEntry.link = '/settings';
    settingsEntry.icon = 'cogs';
  }

}
