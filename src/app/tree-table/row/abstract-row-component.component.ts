import {Input, OnInit} from '@angular/core';

export abstract class AbstractRowComponentComponent<T> implements OnInit {


  private _bean: T;
  constructor() {
  }

  @Input()
  set bean(bean: T) {
    this._bean = bean;
  }

  get bean(): T {
    return this._bean;
  }

  ngOnInit() {
  }

}
