import {ComponentRef, Directive, Input, OnInit} from '@angular/core';
import {RowComponentReady} from '../components/row/row.component';
import {Node} from '../node';

@Directive({
  selector: '[ttToggleRow]'
})
export class TtToggleRowDirective implements OnInit {

  @Input()
  public node: Node<any>;
  @Input()
  public componentRef: ComponentRef<RowComponentReady<any>>;
  public expender: HTMLElement;

  constructor() {
  }

  ngOnInit(): void {
    this.expender = this.componentRef.instance.getExpender();
    if (this.expender) {
      this.expender.classList.add('fa');
      if (this.node.children && this.node.children.length > 0) {
        this.toggleClasses();
        this.expender.onclick = this.onExpenderClick.bind(this);
      } else {
        this.expender.classList.add('fa-empty');
      }
    }
  }

  onExpenderClick(event: MouseEvent) {
    this.node.status = this.node.status === 'expended' ? 'colapsed' : 'expended';
    this.toggleClasses();
  }

  toggleClasses() {
    switch (this.node.status) {
      case 'colapsed':
        this.expender.classList.remove('fa-minus');
        this.expender.classList.add('fa-plus');
        break;
      case 'expended':
        this.expender.classList.remove('fa-plus');
        this.expender.classList.add('fa-minus');
        break;
    }
  }

}
