import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {SiSelectComponent} from '../../../../states-inputs/components/si-select/si-select.component';
import {Category, Version} from '../../../services/beans';
import {RedmineService} from '../../../services/redmine.service';
import {Observable} from 'rxjs/Observable';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'rm-ng-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RmNgCategoryComponent),
        multi: true
    }]
})
export class RmNgCategoryComponent extends SiSelectComponent<Category> implements OnInit {

    @Input()
    public project_id: number;

    @Input()
    set category(category: Category) {
        this.value = category;
    }

    constructor(private redmine: RedmineService) {
        super();
        this.isAsync = true;
    }

    load(): Observable<Category[]> {
        return this.redmine.projects.find(this.project_id).map((project) => {
            return project.issue_categories;
        });
    }
}
