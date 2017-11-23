import {Component, Input, OnInit} from '@angular/core';
import {Issue, Tracker} from '../../../../services/redmine/beans';
import {RedmineService} from '../../../../services/redmine.service';

@Component({
  selector: 'app-rm-proprity',
  templateUrl: './rm-proprity.component.html',
  styleUrls: ['./rm-proprity.component.css']
})
export class RmProprityComponent implements OnInit {

  @Input()
  public issue: Issue;

  @Input()
  public availableTrakers: Tracker[];

  constructor(private redmine: RedmineService) {
  }

  ngOnInit() {
    if(this.issue) {

    }
  }

}
