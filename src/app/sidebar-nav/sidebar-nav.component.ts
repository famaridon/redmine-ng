import { Component, OnInit } from '@angular/core';
import { AppSidebarService, Entry, Link } from '../services/app-sidebar.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  sidebarNavService: AppSidebarService;
  public entries: Array<Entry>;

  constructor(sidebarNavService: AppSidebarService) {
    this.sidebarNavService = sidebarNavService;
    this.entries = this.sidebarNavService.entries;
  }

  ngOnInit() {
  }

}
