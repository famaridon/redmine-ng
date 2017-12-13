import {Component, forwardRef, OnInit} from '@angular/core';
import {AbstractSIComponent} from '../abstract-si-input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'si-text',
  templateUrl: './si-text.component.html',
  styleUrls: ['./si-text.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SiTextComponent),
    multi: true
  }]
})
export class SiTextComponent extends AbstractSIComponent<string> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
