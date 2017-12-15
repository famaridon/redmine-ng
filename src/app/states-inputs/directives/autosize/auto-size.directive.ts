import {AfterContentChecked, Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[siAutoSize]'
})
export class SiAutoSizeDirective implements AfterContentChecked {

  @Input()
  public extraWidth = 4;

  @HostListener('input', ['$event.target'])
  onInput(): void {
    this.adjustWidth();
  }

  constructor(public element: ElementRef) {
  }

  ngAfterContentChecked(): void {
    this.adjustWidth();
  }

  adjustWidth(): void {
    const style = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-size');
    const fontFamily = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-family');
    const fontSize = parseFloat(style);
    const extraWidthCalculated = this.getTextWidth('_', fontSize, fontFamily) * this.extraWidth;
    this.element.nativeElement.style.width = this.getTextWidth(this.element.nativeElement.value, fontSize, fontFamily)
      + extraWidthCalculated + 'px';
  }

  getTextWidth(value: string, fontSize: any, fontFamily: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.font = `${fontSize}px ${fontFamily}`;
    return ctx!.measureText(value).width;
  }
}
