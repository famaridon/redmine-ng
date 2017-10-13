import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private settingsServcie: SettingsService;
  private apiKey: string;

  constructor(settingsServcie: SettingsService) {
    this.settingsServcie = settingsServcie;
  }

  ngOnInit() {
    this.apiKey = this.settingsServcie.getString('apiKey');
  }

  public save(): void {
    this.settingsServcie.setString('apiKey', this.apiKey);

  }

}
