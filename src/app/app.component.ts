import {Component} from '@angular/core';
import {RedmineService} from './services/redmine.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private redmine: RedmineService) {
  }

}
