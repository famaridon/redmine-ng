import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractSIComponent} from '../abstract-si-input';
import {IOption} from '../../states-inputs.module';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'si-select',
    templateUrl: './si-select.component.html',
    styleUrls: ['./si-select.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SiSelectComponent),
        multi: true
    }]
})
export class SiSelectComponent<T extends IOption> extends AbstractSIComponent<T> implements OnInit {

    @Input()
    public availableOptionsObservable: Observable<T[]>;
    public availableOptions: T[] = [];
    public isAsync = false;
    public isLoaded = false;

    constructor() {
        super();
    }

    ngOnInit() {
        if (this.availableOptionsObservable) {
            this.isAsync = true;
            this.setAsyncAvailableOptions();
        }
    }

    compareFn(t1: T, t2: T): boolean {
        return t1 && t2 ? t1.getComparableValue() === t2.getComparableValue() : t1 === t2;
    }

    switchMode(): void {
        super.switchMode();
        if (this.isAsync && !this.isLoaded) {
            this.availableOptionsObservable = this.load();
            this.setAsyncAvailableOptions();
        }
    }

    load(): Observable<T[]> {
        return null;
    }

    private setAsyncAvailableOptions() {
        this.availableOptionsObservable.subscribe((availableOptions) => {
            this.availableOptions = availableOptions;
            if (this.availableOptions.findIndex((element) => {
                    return element.getComparableValue() === this.innerValue.getComparableValue();
                }) < 0) {
                this.availableOptions.push(this.innerValue);
            }
            this.isLoaded = true;
        });
    }

}
