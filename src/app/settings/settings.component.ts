import { Component, OnInit } from '@angular/core';
import { SidebarNavService, Entry, Link } from '../sidebar-nav.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private sidebarNavService: SidebarNavService;
  private apiKey: string;

  constructor(sidebarNavService: SidebarNavService) {
    this.sidebarNavService = sidebarNavService;
    const queries = this.sidebarNavService.addEntry('Queries');
    const dashboard = this.sidebarNavService.addEntry('Dashboard');

    // TODO only test
    const burndown: Link = new Link();
    burndown.href = '#';
    burndown.label = 'burndown';
    const burnup: Link = new Link();
    burnup.href = '#';
    burnup.label = 'burnup';
    setTimeout(() => {
      dashboard.links.push(burndown);
      dashboard.links.push(burnup);
    }, 1200);

  }

  ngOnInit() {
  }

}
