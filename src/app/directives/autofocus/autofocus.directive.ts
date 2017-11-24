import {AfterViewInit, Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit, AfterViewInit{

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.el.nativeElement.focus()
  }

}
