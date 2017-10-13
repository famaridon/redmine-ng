import {Component, ElementRef, OnInit} from '@angular/core';
import {AppSidebarService, Entry} from "../../services/app-sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebar implements OnInit {

  private el: ElementRef
  private sidebarNavService: AppSidebarService;
  public entries: Array<Entry>;

  constructor(sidebarNavService: AppSidebarService, el: ElementRef) {
    this.sidebarNavService = sidebarNavService;
    this.el = el;
    this.entries = this.sidebarNavService.entries;
  }

  // wait for the component to render completely
  public ngOnInit(): void {
    var nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
