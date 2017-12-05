import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractSIComponent} from '../abstract-si-input';
import {IOption} from '../states-inputs.module';

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

  ngOnInit() {
  }

  @Input()
  public availableOptions: T[] = [];

  constructor() {
    super();
  }

  compareFn(t1: T, t2: T): boolean {
    return t1 && t2 ? t1.getComparableValue() === t2.getComparableValue() : t1 === t2;
  }
}
