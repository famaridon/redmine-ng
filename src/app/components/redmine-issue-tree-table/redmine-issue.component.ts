import {Component, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Issue} from '../../services/redmine/beans';
import {Node} from './redmine-issue-tree-table.component';

@Component({
  selector: 'app-redmine-issue,[app-redmine-issue]',
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
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;

    if ( parentElement.tagName === 'TR' ) { // my parent is a tr i move to table
      parentElement.removeChild(nativeElement);
      parentElement.parentElement.insertBefore(nativeElement, parentElement.nextSibling);
    }

    nativeElement.classList.add(`tt-level-${this.level}`);
    nativeElement.setAttribute('data-rm-status', this.node.element.status.id.toString());
    nativeElement.setAttribute('data-rm-priority', this.node.element.priority.id.toString());
  }

}

@Directive({
  selector: '[appNodeExpander]'
})
export class SidebarToggleDirective {
  constructor() {
  }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    document.querySelector('body').classList.toggle('sidebar-hidden');
  }
}
