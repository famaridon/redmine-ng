import {Component, forwardRef, OnInit} from '@angular/core';
import {AbstractRmInputComponent} from '../abstract-rm-input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-rm-text',
  templateUrl: './rm-text.component.html',
  styleUrls: ['./rm-text.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RmTextComponent),
    multi: true
  }]
})
export class RmTextComponent extends AbstractRmInputComponent<string> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
