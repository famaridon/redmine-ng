import {Component} from '@angular/core';
import {AppSidebarService, Entry} from './services/app-sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private sidebarService: AppSidebarService;

  constructor(sidebarService: AppSidebarService) {
    this.sidebarService = sidebarService;
    let projectEntry: Entry = this.sidebarService.addEntry('Project');
    projectEntry.icon = 'building';
    projectEntry.link= '/project/moovapps-process-team'
    let settingsEntry: Entry = this.sidebarService.addEntry('Settings');
    settingsEntry.link = '/settings';
    settingsEntry.icon = 'cogs';
  }

}
