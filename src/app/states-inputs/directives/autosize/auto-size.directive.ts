import {AfterContentChecked, Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[siAutoSize]'
})
export class SiAutoSizeDirective implements AfterContentChecked {

  @Input()
  public extraWidth = 4;

  @Input()
  public extraHeight = 2;

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
    const fontSize = parseFloat(window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-size'));
    const lineHeight = parseFloat(window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('line-height'));
    const fontFamily = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-family');

    // calculate the extra width
    const extraWidthTextMetrics = this.getTextMetrics('_', fontSize, fontFamily);

    // on text area set the height
    if (this.element.nativeElement.tagName === 'TEXTAREA') {
      this.element.nativeElement.style.width = '100%';
      const rows = (this.element.nativeElement.value.match(/\r?\n/g) || []).length;
      this.element.nativeElement.style.height = lineHeight * (rows + this.extraHeight) + 'px';
    } else if (this.element.nativeElement.tagName === 'INPUT') {
      // calculate the content text metrics
      const contentTextMetrics = this.getTextMetrics(this.element.nativeElement.value, fontSize, fontFamily);
      // set the width
      this.element.nativeElement.style.width = contentTextMetrics.width + extraWidthTextMetrics.width * this.extraWidth + 'px';
    }
  }

  getTextMetrics(value: string, fontSize: any, fontFamily: string): TextMetrics {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.font = `${fontSize}px ${fontFamily}`;
    return ctx!.measureText(value);
  }
}
