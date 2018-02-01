import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Priority, Tracker} from '../../services/beans';
import {SiSelectComponent} from "../../../states-inputs/components/si-select/si-select.component";
import {RedmineService} from "../../services/redmine.service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'rm-ng-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RmNgPriorityComponent),
    multi: true
  }]
})
export class RmNgPriorityComponent extends SiSelectComponent<Priority> implements OnInit {

  @Input()
  set priority(priority: Tracker) {
    this.value = priority;
  }

  constructor(private redmine: RedmineService) {
    super();
    this.isAsync = true;
  }

  load(): Observable<Priority[]> {
    return this.redmine.priorities.findAll();
  }
}
