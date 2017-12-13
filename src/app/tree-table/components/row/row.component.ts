import {Component, ComponentFactory, ComponentRef, ElementRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Node} from '../../node'
import {AbstractRowComponentComponent} from "./abstract-row-component.component";

@Component({
  selector: 'tt-row , [tt-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent<T> implements OnInit {

  @ViewChild('componentContainer', {read: ViewContainerRef})
  private container: ViewContainerRef;
  @Input()
  public factory: ComponentFactory<AbstractRowComponentComponent<T>>;
  @Input()
  public node: Node<T>;
  @Input()
  public level = 0;
  private componentRef: ComponentRef<AbstractRowComponentComponent<T>>;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.container.clear();
    this.componentRef = this.container.createComponent(this.factory);
    this.componentRef.instance.bean = this.node.element;

    const nativeElement: HTMLElement = this.el.nativeElement;
    // const parentElement: HTMLElement = nativeElement.parentElement;
    //
    // if (parentElement.classList.contains('list-group-item')) { // my parent is a tr i move to table
    //   parentElement.removeChild(nativeElement);
    //   parentElement.parentElement.insertBefore(nativeElement, parentElement.nextSibling);
    // }
    nativeElement.classList.add(`tt-level-${this.level}`);
    nativeElement.setAttribute('data-tt-parent', this.node.id);
  }

}
