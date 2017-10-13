import { Component, OnInit } from '@angular/core';
import { AppSidebarService, Entry, Link } from '../services/app-sidebar.service';
import { SettingsService } from '../services/settings.service';
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private sidebarNavService: AppSidebarService;
  private settingsServcie: SettingsService;
  private apiKey: string;

  constructor(settingsServcie: SettingsService, sidebarNavService: AppSidebarService) {
    this.settingsServcie = settingsServcie;
    this.sidebarNavService = sidebarNavService;
  }

  ngOnInit() {
  console.log('Hello');
    this.apiKey = this.settingsServcie.getString('apiKey');
  }

  public save(): void {
    this.settingsServcie.setString('apiKey', this.apiKey);

  }

}
