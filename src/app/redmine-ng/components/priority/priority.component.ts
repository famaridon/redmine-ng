import {Component, Input, OnInit} from '@angular/core';
import {Priority, Tracker} from '../../services/beans';
import {SiSelectComponent} from "../../../states-inputs/components/si-select/si-select.component";
import {RedmineService} from "../../services/redmine.service";

@Component({
  selector: 'rm-ng-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class RmNgPriorityComponent extends SiSelectComponent<Priority> implements OnInit {

  @Input()
  set priority(priority: Tracker) {
    this.value = priority;
  }

  constructor(private redmine: RedmineService) {
    super();
  }

  ngOnInit() {
    this.availableOptionsObservable = this.redmine.priorities.findAll();
    super.ngOnInit();
  }

}
