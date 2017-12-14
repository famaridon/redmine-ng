import {Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AbstractRedmineBean, Issue} from '../services/beans';
import {Subscription} from 'rxjs/Subscription';

export abstract class AbstractRedmineNgBeanComponent<T extends AbstractRedmineBean> implements OnInit, OnDestroy {

  @Input()
  public nameFilter: string;
  private subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected loadBean(bean: Observable<T> | Promise<T> | T, callback: (issue: T) => void): void {
    if (bean instanceof Observable) {
      this.subscription = bean.subscribe((p) => {
        callback(p);
      });
    } else if (bean instanceof Promise) {
      bean.then((p) => {
        callback(p);
      })
    } else if (bean instanceof Issue) {
      callback(bean);
    } else {
      throw new Error('Unsupported input type!');
    }
  }

  public isVisible(): boolean {
    if (this.getBean() && this.nameFilter) {
      return this.getBean().name.toLowerCase().includes(this.nameFilter.toLowerCase())
    } else if (this.getBean() && !this.nameFilter) {
      return true;
    }
    return false;
  }

  protected abstract getBean(): T ;
}
