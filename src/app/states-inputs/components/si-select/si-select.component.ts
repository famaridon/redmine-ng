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

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.availableOptionsObservable) {
      this.availableOptionsObservable.subscribe((availableOptions) => {
        this.availableOptions = availableOptions;
      })
    }
  }

  compareFn(t1: T, t2: T): boolean {
    return t1 && t2 ? t1.getComparableValue() === t2.getComparableValue() : t1 === t2;
  }

}
