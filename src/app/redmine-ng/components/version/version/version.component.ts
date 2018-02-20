import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {SiSelectComponent} from '../../../../states-inputs/components/si-select/si-select.component';
import {Status, Version} from '../../../services/beans';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {RedmineService} from '../../../services/redmine.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'rm-ng-version',
    templateUrl: './version.component.html',
    styleUrls: ['./version.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RmNgVersionComponent),
        multi: true
    }]
})
export class RmNgVersionComponent extends SiSelectComponent<Version> implements OnInit {

    @Input()
    public project_id: number;

    @Input()
    set version(version: Version){
        this.value = version;
    }

    constructor(private redmine: RedmineService) {
        super();
        this.isAsync = true;
    }

    load(): Observable<Version[]> {
        return this.redmine.versions.findByProject(this.project_id).map((page) => {
            return page.elements;
        });
    }

}
