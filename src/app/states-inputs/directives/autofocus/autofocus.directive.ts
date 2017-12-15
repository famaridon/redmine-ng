import {AfterViewInit, Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[siAutoFocus]'
})
export class SiAutoFocusDirective implements OnInit, AfterViewInit{

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.el.nativeElement.focus()
  }

}
