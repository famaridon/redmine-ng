import {Component, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Issue} from '../../services/redmine/beans';
import {Node} from './redmine-issue-tree-table.component';

@Component({
  selector: 'app-redmine-issue',
  templateUrl: './redmine-issue.component.html',
  styleUrls: ['./redmine-issue.component.css']
})
export class RedmineIssueComponent implements OnInit {

  @Input()
  public node: Node<Issue>;
  @Input()
  public level = 0;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
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

@Directive({
  selector: '[appNodeExpander]'
})
export class SidebarToggleDirective {
  constructor() { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    document.querySelector('body').classList.toggle('sidebar-hidden');
  }
}
