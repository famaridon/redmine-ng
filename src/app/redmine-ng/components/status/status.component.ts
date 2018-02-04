import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Status} from '../../services/beans';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {SiSelectComponent} from '../../../states-inputs/components/si-select/si-select.component';
import {RedmineService} from '../../services/redmine.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'rm-ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RmNgStatusComponent),
    multi: true
  }]
})
export class RmNgStatusComponent extends SiSelectComponent<Status> implements OnInit {

  @Input()
  public tracker_id: number;

  @Input()
  public status: Status;

  constructor(private redmine: RedmineService) {
    super();
    this.isAsync = true;
  }

  load(): Observable<Status[]> {
    return this.redmine.status.getAvailableStatus(this.tracker_id, this.value ? this.value.id : null).map((page) => { return page.elements; });
  }

}
