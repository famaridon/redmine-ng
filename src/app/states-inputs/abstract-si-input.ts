import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';


const noop = () => {
};

export abstract class AbstractSIComponent<T> implements OnInit, ControlValueAccessor {

  /**
   * The internal data model
   */
  private innerValue: T;
  /**
   * hold the last value
   */
  private nextValue: T;

  @Input()
  public mode: 'read' | 'write' = 'read';


  /**
   * get accessor
   */
  get value(): T {
    return this.innerValue;
  };

  /**
   * set accessor including call the onchange callback
   */
  set value(v: T) {
  console.log(`set value(${v})`);
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.nextValue = this.cloneValue(this.innerValue);
      this.onChangeCallback(v);
    }
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Set touched on blur
   */
  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: T): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.nextValue = this.cloneValue(this.innerValue);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // new Error("Method not implemented.");
  }


  validateChanges(): void {
    this.value = this.cloneValue(this.nextValue);
    this.switchMode();
  }

  undoChanges(): void {
    this.nextValue = this.cloneValue(this.value);
    this.switchMode();
  }

  cloneValue(value: T): T {
    if (this.nextValue instanceof Object) {
      return Object.assign({}, value);
    } else {
      return value;
    }
  }

  switchMode(): void {
    this.mode = this.mode === 'write' ? 'read' : 'write';
  }

}
