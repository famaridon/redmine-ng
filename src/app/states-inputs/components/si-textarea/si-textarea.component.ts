import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractSIComponent} from '../abstract-si-input';

@Component({
  selector: 'si-textarea',
  templateUrl: './si-textarea.component.html',
  styleUrls: ['./si-textarea.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SiTextareaComponent),
    multi: true
  }]
})
export class SiTextareaComponent extends AbstractSIComponent<string> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
