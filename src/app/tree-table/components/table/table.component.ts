import {Component, ComponentFactory, ElementRef, Input, OnInit,} from '@angular/core';
import {Node} from '../../node'

@Component({
  selector: 'tt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit {

  @Input()
  public factory: ComponentFactory<any>;
  @Input()
  public tree: Node<T>[];

  constructor(private ref: ElementRef) {
  }

  ngOnInit() {
  }

}
