import {Component, OnInit} from '@angular/core';
import {AbstractRmInputComponent} from '../abstract-rm-input';

@Component({
  selector: 'app-rm-text',
  templateUrl: './rm-text.component.html',
  styleUrls: ['./rm-text.component.css']
})
export class RmTextComponent extends AbstractRmInputComponent<string> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
