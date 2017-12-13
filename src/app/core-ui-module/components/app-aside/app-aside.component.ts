import {Component, ElementRef, OnInit} from '@angular/core';
import {RedmineService} from '../../../redmine-ng/services/redmine.service';

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html',
  styleUrls: ['./app-aside.component.css']
})
export class AppAsideComponent implements OnInit {

  private el: ElementRef;
  private redmine: RedmineService;


  constructor(el: ElementRef, redmine: RedmineService) {
    this.el = el;
    this.redmine = redmine;
  }

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
