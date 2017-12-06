import { Component, OnInit } from '@angular/core';
import {Settings, SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public settings: Settings;

  constructor(protected settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
    });
  }

  public save(): void {
    this.settingsService.save(this.settings);

  }

}
