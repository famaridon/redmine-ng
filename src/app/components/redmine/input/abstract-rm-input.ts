import {Input, OnInit, Output} from '@angular/core';


export abstract class AbstractRmInputComponent<T> implements OnInit {

  @Input()
  @Output()
  public value: T;

  public nextValue: T;

  @Input()
  public mode: 'read' | 'write' = 'read';

  constructor() {
  }

  ngOnInit() {
    this.nextValue = this.value;
  }

  validateChanges(): void {
    if (this.nextValue instanceof Object) {
      this.value = Object.assign({}, this.nextValue);
    } else {
      this.value = this.nextValue;
    }

    this.switchMode();
  }

  undoChanges(): void {
    if (this.nextValue instanceof Object) {
      this.nextValue = Object.assign({}, this.value);
    } else {
      this.nextValue = this.value;
    }

    this.switchMode();
  }

  switchMode(): void {
    this.mode = this.mode === 'write' ? 'read' : 'write';
  }

}
