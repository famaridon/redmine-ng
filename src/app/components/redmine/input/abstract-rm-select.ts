import {Input} from '@angular/core';
import {AbstractRedmineBean} from '../../../services/redmine/beans';
import {AbstractRmInputComponent} from './abstract-rm-input';


export abstract class AbstractRmSelectComponent<T extends AbstractRedmineBean> extends AbstractRmInputComponent<T> {

  public availableOptions: T[] = [];

  constructor() {
    super();
  }

}
