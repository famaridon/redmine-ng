import {Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AbstractRedmineBean} from '../services/beans';
import {Subscription} from 'rxjs/Subscription';

export abstract class AbstractRedmineComponent<T extends AbstractRedmineBean> implements OnInit, OnDestroy {
  @Input()
  public nameFilter: string;
  public internalBean: T;
  private subscription: Subscription;

  constructor() {
  }

  @Input()
  set bean(bean: Observable<T> | Promise<T> | T) {
    if (bean instanceof Observable) {
      this.subscription = bean.subscribe((p) => {
        this.internalBean = p;
      });
    } else if (bean instanceof Promise) {
      bean.then((p) => {
        this.internalBean = p;
      })
    } else if (bean instanceof AbstractRedmineBean) {
      this.internalBean = bean;
    } else {
      throw new Error('Unsupported input type!');
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public isVisible(): boolean {
    if (this.internalBean && this.nameFilter) {
      return this.internalBean.name.toLowerCase().includes(this.nameFilter.toLowerCase())
    } else if (this.internalBean && !this.nameFilter) {
      return true;
    }
    return false;
  }

}
