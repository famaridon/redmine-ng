import {AbstractSIComponent} from './abstract-si-input';
import {Input} from '@angular/core';


export abstract class AbstractSISelectComponent<T> extends AbstractSIComponent<T> {

  constructor() {
    super();
  }

  @Input()
  set availableOptions(availableOptions: T[]) {
    this.availableOptions = availableOptions;
  }

}
