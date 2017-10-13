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
    let settingsEntry: Entry = this.sidebarService.addEntry('Settings');
    settingsEntry.icon = 'cogs';
  }

}
