import {Component, ElementRef, OnInit} from '@angular/core';
import {AppSidebarService, Entry} from "../../services/app-sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html'
})
export class AppSidebarComponent implements OnInit {

  private el: ElementRef;
  private appSidebarNavService: AppSidebarService;
  public entries: Array<Entry>;

  constructor(appSidebarNavService: AppSidebarService, el: ElementRef) {
    this.appSidebarNavService = appSidebarNavService;
    this.el = el;
    this.entries = this.appSidebarNavService.entries;
  }

  // wait for the component to render completely
  public ngOnInit(): void {
    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
