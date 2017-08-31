import { Injectable } from '@angular/core';

@Injectable()
export class SidebarNavService {

  public entries : Array<Entry> = new Array();

  constructor() {
    this.entries.push(new Entry("Queries"));
    let dashboard : Entry = new Entry("Dashboard");
    let burndown : Link = new Link();
    burndown.href = "#";
    burndown.label = "burndown";
    let burnup : Link = new Link();
    burnup.href = "#";
    burnup.label = "burnup";

    dashboard.links.push(burndown);
    dashboard.links.push(burnup);
    this.entries.push(dashboard);
  }

}

export class Entry {

  public readonly label:string;
  id: string;
  public readonly links: Array<Link> = new Array();

  constructor(label:string) {
    this.label = label;
  }

}

export class Link {
  label:string;
  href: string;
}
