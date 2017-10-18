import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  protected settingsServcie: SettingsService;
  public apiKey: string;
  public server: string;

  constructor(settingsServcie: SettingsService) {
    this.settingsServcie = settingsServcie;
  }

  ngOnInit() {
    this.server = this.settingsServcie.getString('server');
    this.apiKey = this.settingsServcie.getString('apiKey');
  }

  public save(): void {
    this.settingsServcie.setString('server', this.server);
    this.settingsServcie.setString('apiKey', this.apiKey);

  }

}
