import {Component, ComponentFactory, ComponentRef, ElementRef, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Node} from '../../node'

@Component({
  selector: 'tt-row , [tt-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent<T> implements OnInit {

  @ViewChild('componentContainer', {read: ViewContainerRef})
  private container: ViewContainerRef;
  @Input()
  public factory: ComponentFactory<RowComponentReady<T>>;
  @Input()
  public node: Node<T>;
  @Input()
  public level = 0;
  public componentRef: ComponentRef<RowComponentReady<T>>;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.container.clear();
    this.componentRef = this.container.createComponent(this.factory);
    this.componentRef.instance.setElement(this.node.element);
    this.componentRef.location.nativeElement.classList.add('tt-row-content')

    const nativeElement: HTMLElement = this.el.nativeElement;
    nativeElement.classList.add(`tt-level-${this.level}`);
    nativeElement.setAttribute('data-tt-parent', this.node.id);
  }

}

export interface RowComponentReady<T> {
  setElement(element: T): void;
  getExpender(): HTMLElement;
}
