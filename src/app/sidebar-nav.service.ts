import { Injectable } from '@angular/core';

@Injectable()
export class SidebarNavService {

  public entries : Array<Entry> = new Array();

  constructor() {
    setTimeout(() => {
      this.entries.push(new Entry("Queries"));
    }, 200);
    setTimeout(() => {
      this.entries.push(new Entry("Dashboard"));
    }, 500);
  }

}

export class Entry {

  public readonly label:string;
  links: Array<Link> = new Array();

  constructor(label:string) {
    this.label = label;
  }

}

export class Link {
  label:string;
  href: Link;
}
