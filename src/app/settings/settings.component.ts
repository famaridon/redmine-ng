import { Component, OnInit } from '@angular/core';
import { SidebarNavService, Entry, Link } from '../sidebar-nav.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private sidebarNavService: SidebarNavService

  constructor(sidebarNavService: SidebarNavService) {
    this.sidebarNavService = sidebarNavService;
    let queries = this.sidebarNavService.addEntry("Queries");
    let dashboard = this.sidebarNavService.addEntry("Dashboard");

    // TODO only test
    let burndown : Link = new Link();
    burndown.href = "#";
    burndown.label = "burndown";
    let burnup : Link = new Link();
    burnup.href = "#";
    burnup.label = "burnup";
    setTimeout(() => {
      dashboard.links.push(burndown);
      dashboard.links.push(burnup);
    }, 1200);

  }

  ngOnInit() {
  }

}
