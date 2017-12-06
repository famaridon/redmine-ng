import {Component, OnInit} from '@angular/core';
import {Settings, SettingsService} from '../services/settings.service';
import {User} from '../services/redmine/beans';
import {RedmineService} from '../services/redmine.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public settings: Settings;
  public user: User;

  constructor(protected settingsService: SettingsService, protected redmine: RedmineService) {
  }

  ngOnInit() {
    this.settingsService.getSettings().subscribe((settings) => {
      this.settings = settings;
      this.redmine.users.findLoggedOnUser().subscribe((user) => {
          this.user = user;
          console.dir(this.user);
        },
        (error) => {
          this.user = null;
        });
    });
  }

  public save(): void {
    this.settingsService.save(this.settings);

  }

}
