import { Component, OnInit } from '@angular/core';
import { SidebarNavService, Entry, Link } from '../sidebar-nav.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  sidebarNavService: SidebarNavService;
  public entries: Array<Entry>;

  constructor(sidebarNavService: SidebarNavService) {
    this.sidebarNavService = sidebarNavService;
    this.entries = this.sidebarNavService.entries;
  }

  ngOnInit() {
  }

}
